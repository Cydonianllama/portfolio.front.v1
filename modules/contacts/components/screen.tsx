/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

// PASOS
// 1. configurar "columnsUsersTable"
//

// components
import { useEffect, useState } from "react";
import { DialogCreateContact } from "./dialog.create";
import { DialogEditContact } from "./dialog.edit";
import { DialogConfirmDeleteContact } from "./dialog.confirmdelete";
import { SectionTable } from './section.table';
import { SectionFooterTable } from "./section.footerTable";

// header filter
import { InputSearchTable } from "@/components/InputSearchTable"
import { Filter } from "./filter";
import { filterOptions } from "../types/options.filter";
import { Sort } from "./sort";
import { sortOptions } from "../types/options.sort";

// components
import { PropsWithChildren } from 'react'
import { Button } from '@/components/ui/button'

// icons
import { IoMdRefresh } from "react-icons/io";

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
import { useWorkspaceSelectionStore } from "@/modules/app/stores/workspaceStore";
import { DialogCreateConversationContact } from "./dialog.contact.createconversation";
import { UseChatActions } from "@/modules/chat/hooks/useChatActions";
import { CreationConversationSchema } from "../schemas/creation.conversation";
import { ListIntegrations } from "@/api/integration/integration.api";

export const ConctatsScreen = () => {

  const workspaceAppStore = useWorkspaceSelectionStore();

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
  } = useListContacts(page, query, workspaceAppStore.selectedWorkspaceId || '');

  const createContactAction = useCreateManagerV1(page, query, workspaceAppStore.selectedWorkspaceId || '')
  const updateContactAction = useUpdateManagerV1(page, query, workspaceAppStore.selectedWorkspaceId || '')
  const deleteContatAction = useDeleteManagerV1(page, query, workspaceAppStore.selectedWorkspaceId || '')

  const chatActions = UseChatActions()

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

      if (!workspaceAppStore.selectedWorkspaceId) {
        console.log('[stop] workspaceAppStore.selectedWorkspaceId doesnt have workspace selected')
      }

      // reseteamos estados y comenzamos estado de carga
      moduleState.setInformationCreationItem({
        hasError: false,
        errorMessage: '',
        loading: true,
      })

      const req = await createContactAction.mutateAsync({
        fullname: data.fullname,
        workspaceId: workspaceAppStore.selectedWorkspaceId || ''
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
        id: moduleState.informationIpdateItem.itemId,
        fullname: data.fullname,
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

      const req = await deleteContatAction.mutateAsync({
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

  const OnCreateConversationContact = async (data: CreationConversationSchema) => {
    try {
      console.log('OnCreateConversationContact')
      await chatActions.CreateConversation({
        participants: data.participants || [],
        workspaceId: data.workspaceId || '',
        integrationId: data.integrationId || ''
      })
    } catch (ex) {

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

  //
  // Integrations
  //

  const ListIntegrationsAction = async () => {
    try {
      const req = await ListIntegrations({
        workspaceId: workspaceAppStore.selectedWorkspaceId || ''
      })

      if (!req) {
        return;
      }

      if (!req.status) {
        return;
      }

      if (req.data.list) {
        moduleState.setInfoCreationConvContact({ integrations: req.data.list || [] })
      }


    } catch (ex) {

    } finally {

    }
  }

  useEffect(() => {
    if (moduleState.infoCreationConvContact.isOpen) {
      ListIntegrationsAction()
    }
  }, [moduleState.infoCreationConvContact.isOpen])

  return (<>
    <div className="relative h-full px-12 flex flex-col">

      {/* start::header */}
      <div className="flex justify-between items-center py-5">
        <div>
          <h1 className="text-xl font-semibold text-gray-700">Administracion de contactos</h1>
          <p className="text-md text-gray-400">Pantalla de administración de contactos</p>
        </div>
        <div className='flex items-center gap-2 '>

        </div>
      </div>
      {/* end::header */}

      {/* start::header filter  */}
      <div className="flex justify-between items-center pb-5">
        <div className="flex gap-2 items-center">
          <InputSearchTable
            onSearch={OnSearch}
            placeholder="Buscar"
            timeout={600}
          />
          {/* <Filter
            options={filterOptions.map(el => ({ id: el.code, label: el.title, values: [{ id: 'test2', label: 'test2' }, { id: 'test3', label: 'test3' }] }))}
          />
          <Sort
            options={sortOptions.map(el => ({ id: el.code, label: el.title }))}
          /> */}
        </div>
        <div className="flex gap-2 items-center">
          <Button variant={'outline'} onClick={HandleToRefresh} size={'icon'} >
            <IoMdRefresh />
          </Button>
          <Button onClick={HandleToOpenAddItem}>Agregar contacto</Button>
          {/* {((moduleState.itemsSelected?.length || 0) > 0) && (<>
            <span>{moduleState.itemsSelected?.length}</span> elementos seleccionados.
          </>)} */}

        </div>
      </div>
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
      <DialogCreateContact
        open={moduleState.informationCreationItem.isOpen}
        setOpen={(open) => moduleState.setInformationCreationItem({ isOpen: open })}
        onCreate={OnCreateItem}
        creating={moduleState.informationCreationItem.loading}
      />

      <DialogEditContact
        open={moduleState.informationIpdateItem.isOpen}
        setOpen={(open) => moduleState.setInformationUpdateItem({ isOpen: open })}
        onUpdate={OnUpdateItem}
        data={moduleState.informationIpdateItem.itemData || null}
        updating={moduleState.informationIpdateItem.loading}
      />

      <DialogConfirmDeleteContact
        open={moduleState.informationDeleteItem.isOpen}
        setOpen={(open) => moduleState.setInformationDeleteItem({ isOpen: open })}
        onDelete={OnDeleteItem}
        deleting={moduleState.informationDeleteItem.loading}
      />

      <DialogCreateConversationContact
        open={moduleState.infoCreationConvContact.isOpen}
        setOpen={(open) => moduleState.setInfoCreationConvContact({ isOpen: open })}
        onCreate={OnCreateConversationContact}
        creating={moduleState.infoCreationConvContact.loading}
        integrations={moduleState.infoCreationConvContact.integrations}
        data={moduleState.infoCreationConvContact.contact}
      />
      {/* end::Dialogs */}
    </div>
  </>)
}