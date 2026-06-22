/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

// PASOS
// 1. configurar "columnsUsersTable"
//

// components
import { useState } from "react";
import { DialogCreate } from "./dialog.create";
import { DialogEdit } from "./dialog.edit";
import { DialogConfirmDelete } from "./dialog.confirmdelete";
import { SectionHeader } from './section.header';
import { SectionTable } from './section.table';
import { SectionFooterTable } from "./section.footerTable";
import { SectionHeaderFilter } from "./section.headerFilter";

// utils
import { toast } from "sonner";

// listado principal
import { useListContacts } from "../hooks/useList";

// store
import { useManagerv1Store } from "../store/store";

// schemas
import { CreationSchema } from "../schemas/item.creation";
import { UpdateSchema } from "../schemas/item.update";

// services
import { useCreateManagerV1 } from "../hooks/useCreate";
import { useUpdateManagerV1 } from "../hooks/useUpdate";
import { useDeleteManagerV1 } from "../hooks/useDelete";

export const ContactScreen = () => {

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
  } = useListContacts(page, query);

  const createContactAction = useCreateManagerV1(page, query)
  const updateContactAction = useUpdateManagerV1(page, query)
  const deleteContactAction = useDeleteManagerV1(page, query)

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
    setPage(1)
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
    try {
      // reseteamos estados y comenzamos estado de carga
      moduleState.setInformationCreationItem({
        hasError: false,
        errorMessage: '',
        loading: true,
      })

      const req = await createContactAction.mutateAsync({
        fullname: data.fullname,
        workspaceId: data.workspaceId
      })

      console.log(req)

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

      const req = await updateContactAction.mutateAsync({
        fullname: data.fullname,
        workspaceId: data.workspaceId,
        id: moduleState.informationIpdateItem.itemId
      })

      console.log(req)

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

      const req = await deleteContactAction.mutateAsync({
        id: moduleState.informationDeleteItem?.itemId
      })

      console.log(req)


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

  //
  // Table
  //

  const OnChangeSelection = (data: any) => {

    const elements: Array<string> = []

    for (const el in data) {
      if (data[el]) {
        elements.push(el)
      }
    }

    moduleState.setItemsSelected(elements)
  }

  const OnClickEmptyCreate = () => {
    moduleState.setInformationCreationItem({
      isOpen: true
    })
  }

  const OnClickRetry = () => {
    HandleToRefresh()
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
        itemsSelected={moduleState.itemsSelected || []}
      />
      {/* end::header filter  */}

      {/* start::table */}
      <SectionTable
        list={data?.data.list || []}
        loading={isFetching}
        hasError={(!data?.status || isError) ? true : false}
        onChangeSelection={OnChangeSelection}
        OnClickEmptyCreate={OnClickEmptyCreate}
        OnClickRetry={OnClickRetry}
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
      <DialogCreate
        open={moduleState.informationCreationItem.isOpen}
        setOpen={(open) => moduleState.setInformationCreationItem({ isOpen: open })}
        onCreate={OnCreateItem}
        creating={moduleState.informationCreationItem.loading}
      />

      <DialogEdit
        open={moduleState.informationIpdateItem.isOpen}
        setOpen={(open) => moduleState.setInformationUpdateItem({ isOpen: open })}
        onUpdate={OnUpdateItem}
        data={moduleState.informationIpdateItem.itemData || null}
        updating={moduleState.informationIpdateItem.loading}
      />

      <DialogConfirmDelete
        open={moduleState.informationDeleteItem.isOpen}
        setOpen={(open) => moduleState.setInformationDeleteItem({ isOpen: open })}
        onDelete={OnDeleteItem}
        deleting={moduleState.informationDeleteItem.loading}
      />
      {/* end::Dialogs */}
    </div>
  </>)
}