/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from '@/components/ui/button'
import { IoMdRefresh } from "react-icons/io";
import { toast } from "sonner";
import { LayoutScreen } from "@/components/layoutScreen";
import { InputSearchTable } from "@/components/InputSearchTable";

import { useListWidgets } from "../hooks/useList";
import { useCreateWidget } from "../hooks/useCreate";
import { useUpdateWidget } from "../hooks/useUpdate";
import { useDeleteWidget } from "../hooks/useDelete";

import { useWidgetStore } from "../store/store";
import { WidgetCreationSchema } from "../schemas/item.creation";
import { WidgetUpdateSchema } from "../schemas/item.update";

import { useWorkspaceSelectionStore } from "@/modules/app/stores/workspaceStore";
import { UseAppInitializer } from "@/hooks/app/useAppInitiallizer";

import { DialogCreateWidget } from "./dialog.create";
import { DialogEditWidget } from "./dialog.edit";
import { DialogConfirmDeleteWidget } from "./dialog.confirmdelete";
import { SectionTableWidget } from "./section.table";

export const WidgetScreen = () => {
  UseAppInitializer({ moduleName: 'widget' })

  const workspaceAppStore = useWorkspaceSelectionStore();
  const moduleState = useWidgetStore();

  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch
  } = useListWidgets(page, query, workspaceAppStore.selectedWorkspaceId || '');

  const createWidgetAction = useCreateWidget(page, query, workspaceAppStore.selectedWorkspaceId || '')
  const updateWidgetAction = useUpdateWidget(page, query, workspaceAppStore.selectedWorkspaceId || '')
  const deleteWidgetAction = useDeleteWidget(page, query, workspaceAppStore.selectedWorkspaceId || '')

  const HandleToOpenAddItem = () => {
    moduleState.setInformationCreationItem({ isOpen: true })
  }

  const HandleToRefresh = async () => {
    setPage(1)
    setQuery("")
    await refetch()
  }

  const OnSearch = async (text: string) => {
    setPage(1)
    setQuery(text)
  }

  const OnCreateItem = async (data: WidgetCreationSchema) => {
    try {
      if (!workspaceAppStore.selectedWorkspaceId) {
        console.log('[stop] workspaceAppStore.selectedWorkspaceId doesnt have workspace selected')
      }

      moduleState.setInformationCreationItem({
        hasError: false,
        errorMessage: '',
        loading: true,
      })

      await createWidgetAction.mutateAsync({
        name: data.name,
        workspaceId: workspaceAppStore.selectedWorkspaceId || '',
        isDark: data.isDark,
        UIconfig: data.UIconfig,
        conversationalConfig: data.conversationalConfig,
      })

    } catch {
      moduleState.setInformationCreationItem({
        hasError: true,
        errorMessage: 'Error inesperado',
        loading: false,
      })
    } finally {
      moduleState.setInformationCreationItem({
        isOpen: false,
        loading: false,
      })
    }
  }

  const OnUpdateItem = async (data: WidgetUpdateSchema) => {
    try {
      if (!moduleState.informationUpdateItem?.itemId) {
        toast.success('Error "itemId" no encontrado')
        return;
      }

      moduleState.setInformationUpdateItem({
        hasError: false,
        errorMessage: '',
        loading: true,
      })

      await updateWidgetAction.mutateAsync({
        id: moduleState.informationUpdateItem.itemId,
        name: data.name,
        isDark: data.isDark,
        UIconfig: data.UIconfig,
        conversationalConfig: data.conversationalConfig,
      })

    } catch {
      moduleState.setInformationUpdateItem({
        hasError: true,
        errorMessage: 'Error inesperado',
        loading: false,
      })
    } finally {
      moduleState.setInformationUpdateItem({
        isOpen: false,
        loading: false,
      })
    }
  }

  const OnDeleteItem = async () => {
    try {
      if (!moduleState.informationDeleteItem?.itemId) {
        return;
      }

      moduleState.setInformationDeleteItem({
        hasError: false,
        errorMessage: '',
        loading: true,
      })

      await deleteWidgetAction.mutateAsync({ id: moduleState.informationDeleteItem?.itemId })

    } catch {
      moduleState.setInformationDeleteItem({
        hasError: true,
        errorMessage: 'Error inesperado',
        loading: false,
      })
    } finally {
      moduleState.setInformationDeleteItem({
        isOpen: false,
        loading: false,
      })
    }
  }

  const OnClickEmptyCreate = () => {
    moduleState.setInformationCreationItem({ isOpen: true })
  }

  const OnClickRetry = () => {
    HandleToRefresh()
  }

  return (<>
    {/* <LayoutScreen layoutFor="table" domConfig={{ className: 'flex flex-col app-section space-y-4' }}>
    </LayoutScreen> */}

    <div className="flex justify-between items-center pt-4 pb-4">
      <div className="flex gap-2 items-center">
        <InputSearchTable onSearch={OnSearch} placeholder="Buscar" timeout={600} />
      </div>
      <div>
        <div className="flex gap-2 items-center">
          <div>
            <Button className={'text-muted-foreground'} variant={'outline'} onClick={HandleToRefresh} size={'icon-sm'}>
              <IoMdRefresh />
            </Button>
          </div>

          <Button onClick={HandleToOpenAddItem}>Crear Widget</Button>
        </div>
      </div>
    </div>

    <div>
      <SectionTableWidget
        list={data?.data?.list || []}
        loading={isFetching}
        hasError={(!data?.status || isError) ? true : false}
        OnClickEmptyCreate={OnClickEmptyCreate}
        OnClickRetry={OnClickRetry}
      />
    </div>

    <DialogCreateWidget
      open={moduleState.informationCreationItem.isOpen}
      setOpen={(open) => moduleState.setInformationCreationItem({ isOpen: open })}
      onCreate={OnCreateItem}
      creating={moduleState.informationCreationItem.loading}
    />

    <DialogEditWidget
      open={moduleState.informationUpdateItem.isOpen}
      setOpen={(open) => moduleState.setInformationUpdateItem({ isOpen: open })}
      onUpdate={OnUpdateItem}
      data={moduleState.informationUpdateItem.itemData || null}
      updating={moduleState.informationUpdateItem.loading}
    />

    <DialogConfirmDeleteWidget
      open={moduleState.informationDeleteItem.isOpen}
      setOpen={(open) => moduleState.setInformationDeleteItem({ isOpen: open })}
      onDelete={OnDeleteItem}
      deleting={moduleState.informationDeleteItem.loading}
    />
  </>)
}
