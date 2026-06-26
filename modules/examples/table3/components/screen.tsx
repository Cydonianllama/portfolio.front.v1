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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


// utils
import { toast } from "sonner";

// listado principal
import { useListManagerV1 } from "../hooks/useList";

// store
import { useManagerv1Store } from "../store/store";

// schemas
import { CreationSchema } from "../schemas/item.creation";
import { UpdateSchema } from "../schemas/item.update";

// services
import { useCreateManagerV1 } from "../hooks/useCreate";
import { useUpdateManagerV1 } from "../hooks/useUpdate";
import { useDeleteManagerV1 } from "../hooks/useDelete";
import { configurationModule, mainTabListConfiguration, tabsAvailables } from "../config";
import { MdSettings } from "react-icons/md";

export const Managerv3Screen = () => {

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

  const createItemAction = useCreateManagerV1(page, query)
  const updateItemAction = useUpdateManagerV1(page, query)
  const deleteItemAction = useDeleteManagerV1(page, query)

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

      const req = await createItemAction.mutateAsync({
        description: data.description,
        name: data.name,
        qty: data.units
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

      const req = await updateItemAction.mutateAsync({
        description: data.description,
        id: moduleState.informationIpdateItem.itemId,
        name: data.name,
        qty: data.units
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

      const req = await deleteItemAction.mutateAsync({
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

  //
  // MAIN TABS
  //

  const HandleToChangeTab = (code: string) => {
    console.log(`tab : ${code}`)
  }

  return (<>
    <div className="">
      {mainTabListConfiguration.isActive && (<>
        <Tabs defaultValue={mainTabListConfiguration.list[0].code} className="py-2 px-12">
          <TabsList className={'gap-1.5 py-5 bg-transparent'}>
            {mainTabListConfiguration.list.map((item, index) => (<TabsTrigger onClick={() => HandleToChangeTab(item.code)} key={item.code} className={'px-4 py-4 '} value={item.code}>
              <MdSettings />
              {item.title}
            </TabsTrigger>))}
          </TabsList>
        </Tabs>
      </>)}
    </div>


    <div className="relative h-full px-12 flex flex-col">
      {/* start::header */}
      <SectionHeader
        title={'Administracion de tabla 3'}
        tab={moduleState.tab}
        onChangeTab={(code: string) => {
          console.log(`tab : ${code}`)
          moduleState.setTab(code as tabsAvailables)
        }}
      />
      {/* end::header */}


      {moduleState.tab == 'Overview' && (<>


        {/* start::header filter  */}
        <SectionHeaderFilter
          OnSearch={OnSearch}
          itemsSelected={moduleState.itemsSelected || []}
          currentTab={moduleState.filterTab}
          onChangeTabSelection={(tab) => moduleState.setFilterTab(tab)}
          defaultTab={configurationModule.filterTabs[0]}

          HandleToOpenAddItem={HandleToOpenAddItem}
          HandleToRefresh={HandleToRefresh}
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

      </>)}
      {moduleState.tab == 'Analitics' && (<>Analitics</>)}
      {moduleState.tab == 'Preferences' && (<>Preferences</>)}
      {moduleState.tab == 'Report' && (<>Report</>)}


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