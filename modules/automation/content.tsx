'use client'

/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useAppData } from "@/hooks/app/useAppData";
import { Button } from "@/components/ui/button"
import { useCallback, useEffect, useState } from "react"
import { RiChatSettingsLine } from "react-icons/ri";
import { automationStore } from "./store/automationStore";
import { useAutomationTest } from "../automation-test/store/automation.test.store";
import { useAutmationActions } from "./actions/useAutomationActions";
import { DialogConfirmDeleteAutomation } from "./components/dialogConfirmDeleteAutomation";
import { DialogCreateAutomation } from "./components/dialogCreateAutomation";
import { DialogUpdateAutomation } from "./components/dialogUpdateAutomation";
import { AutomationTable_, AutomationFooterTable } from "./components/tableAutomation";
//___________ ___________ Main

type AutomationProps = {

}

export const AutomationSection = ({ }: AutomationProps) => {
  const AutomationStore = automationStore();
  const automationActions = useAutmationActions({})
  const appData = useAppData()
  const automationTestStore = useAutomationTest()

  const InitialList = () => {
    automationActions.listEntityNameAction({ page: 1, workspaceId: appData.workspace?.id || '' })
  }

  const OnInit = () => {
    InitialList()
  }

  useEffect(() => {
    OnInit()
  }, [])

  useEffect(() => {
    if (appData.workspace?.id) OnInit()
  }, [appData.workspace?.id])

  return <>
    <div className="p-2">
      <div className="flex justify-between gap-2 items-center mb-4">
        <div>
          <h1 className="text-foreground text-lg font-semibold">Automatizaciones</h1>
        </div>
        <div className="items-center flex gap-2">
          <Button disabled={AutomationStore.listing ? true : false} variant={'secondary'} onClick={() => { InitialList() }}>
            Refresar
          </Button>
          <Button variant={'outline'} onClick={() => { automationTestStore.setState({ openChat: true }) }}>
            <RiChatSettingsLine />
            Chat de test
          </Button>
          <Button onClick={() => { AutomationStore.setCreateState({ openCreate: true }) }}>
            Crear Item
          </Button>
        </div>
      </div>

      {/* <AutomationList_
        isError={false}
        isLoading={AutomationStore.listing}
        list={AutomationStore.list}
        HandleDragEndEvent={() => {}}
        onClickDelete={(id, item) => {
          AutomationStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
        onClickEdit={(id, item) => {
          AutomationStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      /> */}

      <AutomationTable_
        isError={false}
        isLoading={AutomationStore.listing}
        list={AutomationStore.list}
        handleDelete={(id, item) => {
          AutomationStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
        handleEdit={(id, item) => {
          AutomationStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      />

      <AutomationFooterTable
        HandleToNextPage={() => {
          if (!AutomationStore.pagination) return;
          AutomationStore.setListState({
            pagination: {
              ...AutomationStore.pagination,
              page: AutomationStore.pagination?.page + 1,
            }
          })
        }}
        HandleToPrevPage={() => {
          if (!AutomationStore.pagination) return;
          AutomationStore.setListState({
            pagination: {
              ...AutomationStore.pagination,
              page: AutomationStore.pagination?.page - 1,
            }
          })
        }}
        pagination={AutomationStore.pagination}
      />
    </div>

    <DialogCreateAutomation />
    <DialogUpdateAutomation />
    <DialogConfirmDeleteAutomation />
  </>
}


