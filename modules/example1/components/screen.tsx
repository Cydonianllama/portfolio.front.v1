/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

// PASOS
// 1. configurar "columnsUsersTable"
//



// utils
import { useState } from "react";

// components
import { ManagerV1DialogCreate } from "./dialog.create";
import { ManagerV1DialogEdit } from "./dialog.edit";
import { ManagerV1DialogConfirmDelete } from "./dialog.confirmdelete";
import { SectionHeader } from './section.header';
import { SectionTable } from './section.table';
import { SectionFooterTable } from "./section.footerTable";
import { SectionHeaderFilter } from "./section.headerFilter";

// listado principal
import { useListManagerV1 } from "@/modules/example1/hooks/useListManagerV1";

// store
import { useManagerv1Store } from "../store/store";

// schemas
import { CreationSchema } from "../schemas/item.creation";

// services
import { CreateItem, DeleteItem, UpdateItem } from "../services/example.managerv1";

export const Managerv1Screen = () => {

  const moduleState = useManagerv1Store();

  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  // hace el listado de elementos
  const { data, isLoading, error } = useListManagerV1(
    page,
    query
  );

  //
  // section header
  //

  const HandleToOpenAddItem = () => {
    moduleState.setInformationCreationItem({
      isOpen: true
    })
  }

  //
  // section header filter 
  //

  const OnSearch = async (text: string) => {

  }

  //
  // section footer table
  //

  const HandleToNextPage = () => {

  }

  const HandleToPrevPage = () => {

  }

  //
  // DIALOG
  //
  const OnCreateItem = async (data: CreationSchema) => {
    try {
      console.log('OnCreateItem')

      // reseteamos estados y comenzamos estado de carga
      moduleState.setInformationCreationItem({
        hasError: false,
        errorMessage: '',
        loading: true,
      })

      // console.log(data)

      await CreateItem()

    } catch (ex) {
      // error en proceso
      moduleState.setInformationCreationItem({
        hasError: true,
        errorMessage: 'Error inesperado',
        loading: false,
      })

    } finally {
      // cerrar modal // terminar loading
      moduleState.setInformationCreationItem({
        isOpen: false,
        loading: false,
      })
    }
  }

  const OnUpdateItem = async () => {
    try {
      // reseteamos estados y comenzamos estado de carga
      moduleState.setInformationUpdateItem({
        hasError: false,
        errorMessage: '',
        loading: true,
      })

      await UpdateItem()

    } catch (error) {
      // error en proceso
      moduleState.setInformationUpdateItem({
        hasError: true,
        errorMessage: 'Error inesperado',
        loading: false,
      })
    } finally {
      // cerrar modal // terminar loading
      moduleState.setInformationUpdateItem({
        isOpen: false,
        loading: false,
      })
    }
  }

  const OnDeleteItem = async () => {
    try {
      // reseteamos estados y comenzamos estado de carga
      moduleState.setInformationDeleteItem({
        hasError: false,
        errorMessage: '',
        loading: true,
      })

      await DeleteItem()

    } catch (error) {
      // error en proceso
      moduleState.setInformationDeleteItem({
        hasError: true,
        errorMessage: 'Error inesperado',
        loading: false,
      })
    } finally {
      // cerrar modal // terminar loading
      moduleState.setInformationDeleteItem({
        isOpen: false,
        loading: false,
      })
    }
  }

  return (<>
    <div className="relative h-full px-12 flex flex-col">

      {/* start::header */}
      <SectionHeader
        title={'Administracion de usuarios'}
        description={'Pantalla de administración de usuarios'}
        HandleToOpenAddItem={HandleToOpenAddItem}
      />
      {/* end::header */}

      {/* start::header filter  */}
      <SectionHeaderFilter
        OnSearch={OnSearch}
      />
      {/* end::header filter  */}

      {/* start::table */}
      <SectionTable
        list={data?.data || []}
      />
      {/* end::table */}

      {/* start::footer table */}
      <SectionFooterTable
        HandleToNextPage={HandleToNextPage}
        HandleToPrevPage={HandleToPrevPage}
        pagination={data?.pagination || null}
      />
      {/* end::footer table */}

      {/* start::Dialogs */}
      <ManagerV1DialogCreate
        open={moduleState.informationCreationItem.isOpen}
        setOpen={(open) => moduleState.setInformationCreationItem({ isOpen: open })}
        onCreate={OnCreateItem}
        creating={moduleState.informationCreationItem.loading}
      />

      <ManagerV1DialogEdit
        open={moduleState.informationIpdateItem.isOpen}
        setOpen={(open) => moduleState.setInformationUpdateItem({ isOpen: open })}
        onUpdate={OnUpdateItem}
        data={moduleState.informationIpdateItem.itemData || null}
        updating={moduleState.informationIpdateItem.loading}
      />

      <ManagerV1DialogConfirmDelete
        open={moduleState.informationDeleteItem.isOpen}
        setOpen={(open) => moduleState.setInformationDeleteItem({ isOpen: open })}
        onDelete={OnDeleteItem}
        deleting={moduleState.informationDeleteItem.loading}
      />
      {/* end::Dialogs */}
    </div>
  </>)
}