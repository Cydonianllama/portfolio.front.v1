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
import { ManagerV1DialogInternalRol } from "./dialog.internalRol";
import { ManagerV1DialogPassword } from "./dialog.password";
import { ManagerV1DialogStatus } from "./dialog.status";
import { ManagerV1DialogWorkspaces } from "./dialog.workspaces";
import { SectionHeader } from './section.header';
import { SectionTable } from './section.table';
import { SectionFooterTable } from "./section.footerTable";
import { SectionHeaderFilter } from "./section.headerFilter";

// utils
import { toast } from "sonner";

// listado principal
import { useListManagerV1 } from "@/modules/backoffice/users/hooks/useList";

// store
import { useManagerv1Store } from "../store/store";

// schemas
import { CreateUserSchema, RequestCreateUser } from "../schemas/item.creation";
import { RequestUpdateUser, UpdateUserSchema } from "../schemas/item.update";

// services
import { useCreateManagerV1 } from "../hooks/useCreate";
import { useUpdateManagerV1 } from "../hooks/useUpdate";
import { useDeleteManagerV1 } from "../hooks/useDelete";
import { useUpdatePasswordManagerV1 } from "../hooks/useUpdatePassword";

export const UsersScreen = () => {

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

  const createItem = useCreateManagerV1(page, query)
  const updateItem = useUpdateManagerV1(page, query)
  const deleteItem = useDeleteManagerV1(page, query)
  const updatePassword = useUpdatePasswordManagerV1()

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
  const OnCreateItem = async (data: RequestCreateUser) => {
    try {
      // reseteamos estados y comenzamos estado de carga
      moduleState.setInformationCreationItem({
        hasError: false,
        errorMessage: '',
        loading: true,
      })

      const req = await createItem.mutateAsync({
        email: data.email,
        fullname: data.fullname,
        password: data.password,
        username: data.username
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

  const OnUpdateItem = async (data: RequestUpdateUser) => {
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

      const req = await updateItem.mutateAsync({
        email: data.email || '',
        fullname: data.fullname || '',
        username: data.username || '',
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

      const req = await deleteItem.mutateAsync({
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

  const OnUpdateStatus = async (data: Pick<RequestUpdateUser, "status">) => {
    try {
      if (!moduleState.informationStatusItem?.itemId) {
        toast.success('Error "itemId" no encontrado')
        return;
      }

      moduleState.setInformationStatusItem({
        hasError: false,
        errorMessage: '',
        loading: true,
      })

      await updateItem.mutateAsync({
        id: moduleState.informationStatusItem.itemId,
        status: data.status || undefined
      })
    } catch (error) {
      moduleState.setInformationStatusItem({
        hasError: true,
        errorMessage: 'Error inesperado',
        loading: false,
      })
    } finally {
      moduleState.setInformationStatusItem({
        isOpen: false,
        loading: false,
      })
    }
  }

  const OnUpdateInternalRol = async (data: Pick<RequestUpdateUser, "internalRol">) => {
    try {
      if (!moduleState.informationInternalRolItem?.itemId) {
        toast.success('Error "itemId" no encontrado')
        return;
      }

      moduleState.setInformationInternalRolItem({
        hasError: false,
        errorMessage: '',
        loading: true,
      })

      await updateItem.mutateAsync({
        id: moduleState.informationInternalRolItem.itemId,
        internalRol: data.internalRol || undefined
      })
    } catch (error) {
      moduleState.setInformationInternalRolItem({
        hasError: true,
        errorMessage: 'Error inesperado',
        loading: false,
      })
    } finally {
      moduleState.setInformationInternalRolItem({
        isOpen: false,
        loading: false,
      })
    }
  }

  const OnUpdatePassword = async (data: { password: string }) => {
    try {
      if (!moduleState.informationPasswordItem?.itemId) {
        toast.success('Error "itemId" no encontrado')
        return;
      }

      moduleState.setInformationPasswordItem({
        hasError: false,
        errorMessage: '',
        loading: true,
      })

      await updatePassword.mutateAsync({
        id: moduleState.informationPasswordItem.itemId,
        password: data.password
      })
    } catch (error) {
      moduleState.setInformationPasswordItem({
        hasError: true,
        errorMessage: 'Error inesperado',
        loading: false,
      })
    } finally {
      moduleState.setInformationPasswordItem({
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

    for (const el in data){
      if (data[el]){
        elements.push(el)
      }
    }

    // console.log(elements)

    moduleState.setItemsSelected(elements)
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

      <ManagerV1DialogStatus
        open={moduleState.informationStatusItem.isOpen}
        setOpen={(open) => moduleState.setInformationStatusItem({ isOpen: open })}
        onUpdate={OnUpdateStatus}
        data={moduleState.informationStatusItem.itemData || null}
        updating={moduleState.informationStatusItem.loading}
      />

      <ManagerV1DialogWorkspaces
        open={moduleState.informationWorkspacesItem.isOpen}
        setOpen={(open) => moduleState.setInformationWorkspacesItem({ isOpen: open })}
        data={moduleState.informationWorkspacesItem.itemData || null}
      />

      <ManagerV1DialogPassword
        open={moduleState.informationPasswordItem.isOpen}
        setOpen={(open) => moduleState.setInformationPasswordItem({ isOpen: open })}
        onUpdate={OnUpdatePassword}
        updating={moduleState.informationPasswordItem.loading}
      />

      <ManagerV1DialogInternalRol
        open={moduleState.informationInternalRolItem.isOpen}
        setOpen={(open) => moduleState.setInformationInternalRolItem({ isOpen: open })}
        onUpdate={OnUpdateInternalRol}
        data={moduleState.informationInternalRolItem.itemData || null}
        updating={moduleState.informationInternalRolItem.loading}
      />
      {/* end::Dialogs */}
    </div>
  </>)
}
