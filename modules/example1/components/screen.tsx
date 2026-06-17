/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

// PASOS
// 1. configurar "columnsUsersTable"
//

// components
import { useState } from "react";
import { ManagerV1DialogCreate } from "./dialog.create";
import { ManagerV1DialogEdit } from "./dialog.edit";
import { ManagerV1DialogConfirmDelete } from "./dialog.confirmdelete";
import { SectionHeader } from './section.header';
import { SectionTable } from './section.table';
import { SectionFooterTable } from "./section.footerTable";
import { SectionHeaderFilter } from "./section.headerFilter";

// utils
import { toast } from "sonner";

// listado principal
import { useListManagerV1 } from "@/modules/example1/hooks/useListManagerV1";

// store
import { useManagerv1Store } from "../store/store";

// schemas
import { CreationSchema } from "../schemas/item.creation";
import { UpdateSchema } from "../schemas/item.update";

// services
import { CreateItem, DeleteItem, UpdateItem } from "../services/example.managerv1";

export const Managerv1Screen = () => {

  const moduleState = useManagerv1Store();

  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  // hace el listado de elementos
  const {
    data,
    isLoading,
    isFetching,
    error,
    isError,
    refetch
  } = useListManagerV1(page, query);

  //
  // section header
  //

  const HandleToOpenAddItem = () => {
    moduleState.setInformationCreationItem({
      isOpen: true
    })
  }

  const HandleToRefresh = async () => {
    setPage(1)
    setQuery("")
    await refetch()
  }

  //
  // section header filter 
  //

  const OnSearch = async (text: string) => {
    console.log(`OnSearch ${text}`)
    setQuery(text)
  }

  //
  // section footer table
  //

  const HandleToNextPage = () => {
    if (!data?.pagination) {
      console.log('error pagination information not founded')
    }
    setPage((data?.pagination?.page || 0) + 1)
  }

  const HandleToPrevPage = () => {
    if (!data?.pagination) {
      console.log('error pagination information not founded')
    }
    setPage((data?.pagination?.page || 0) - 1)
  }

  //
  // DIALOG
  //
  const OnCreateItem = async (data: CreationSchema) => {
    let hasError = false;

    try {
      // reseteamos estados y comenzamos estado de carga
      moduleState.setInformationCreationItem({
        hasError: false,
        errorMessage: '',
        loading: true,
      })

      const req = await CreateItem({
        description: data.description,
        name: data.name,
        qty: data.units
      })

      if (!req) {
        hasError = true;
        toast.success('Error "req" no encontrado')
      }

      if (!hasError && !req?.status) {
        hasError = true;
        toast.success('Error, consulta fallida')
      }

      if (!hasError && !req?.data) {
        hasError = true;
        toast.success('Error "req" no encontrado')
      }

      if (!hasError) {
        toast.success('Item creado')
        // TODO: add new item to new row

        //req?.data
      }

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

  const OnUpdateItem = async (data: UpdateSchema) => {
    let hasError = false;
    try {
      if (!moduleState.informationIpdateItem?.itemId) {
        console.log('Error itemId not founded')
        toast.success('Error "itemId" no encontrado')
        return;
      }

      // reseteamos estados y comenzamos estado de carga
      moduleState.setInformationUpdateItem({
        hasError: false,
        errorMessage: '',
        loading: true,
      })

      const req = await UpdateItem({
        description: data.description,
        id: moduleState.informationIpdateItem.itemId,
        name: data.name,
        qty: data.units
      })

      if (!req) {
        hasError = true;
        toast.success('Error "req" no encontrado')
      }

      if (!hasError && !req?.status) {
        hasError = true;
        toast.success('Error, consulta fallida')
      }

      if (!hasError && !req?.data) {
        hasError = true;
        toast.success('Error "req" no encontrado')
      }

      if (!hasError) {
        toast.success('Item actualizado')
        // update item from row

        //req?.data
      }

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
    let hasError = false;
    try {
      if (!moduleState.informationDeleteItem?.itemId) {
        console.log('error itemId not founded')
        return;
      }

      // reseteamos estados y comenzamos estado de carga
      moduleState.setInformationDeleteItem({
        hasError: false,
        errorMessage: '',
        loading: true,
      })

      const req = await DeleteItem({
        id: moduleState.informationDeleteItem?.itemId
      })

      if (!req) {
        hasError = true;
        toast.success('Error "req" no encontrado')
      }

      if (!hasError && !req?.status) {
        hasError = true;
        toast.success('Error, consulta fallida')
      }

      if (!hasError && !req?.data) {
        hasError = true;
        toast.success('Error "req" no encontrado')
      }

      if (!hasError) {
        toast.success('Item eliminado')
        // remove item from table
      }

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
        HandleToRefresh={HandleToRefresh}
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
        loading={isFetching}
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