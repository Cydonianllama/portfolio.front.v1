'use client'

import { useAppData } from "@/hooks/app/useAppData"
import { Button } from "@/components/ui/button"
import { TbCodeVariable } from "react-icons/tb"
import { DialogConfirmDelete } from "../MembersSection/components/dialogConfirmDelete"
import { UseVariablesActions } from "./actions/useVariablesAction"
import { DialogCreateVariable } from "./components/variables/dialogCreateVariable"
import { DialogUpdateVariable } from "./components/variables/dialogUpdateVariable"
import { VariableList_, VariableFooterTable } from "./components/variables/tableVariable"
import { FolderSection } from "./folderScreen"
import { useVariableStore } from "./store/variableStore"
import { useEffect } from "react"

//___________ ___________ Main

type VariableProps = {

}

export const VariableSection = ({ }: VariableProps) => {
  const VariableStore = useVariableStore();
  const useVariablesActions = UseVariablesActions({})
  const appData = useAppData()

  const InitialList = () => {
    useVariablesActions.listVariablesAction({ page: 1, workspaceId: appData.workspace?.id || '' })
  }

  const OnInit = () => {
    InitialList()
  }

  useEffect(() => {
    OnInit()
  }, [])

  useEffect(() => {
    OnInit()
  }, [])

  return <>
    <FolderSection />

    <div className="">

      <div className="flex justify-between gap-2 items-center mb-2">
        <h1 className="text-lg font-semibold flex gap-1 items-center">
          <TbCodeVariable />
          Mis variables
        </h1>
        <div>
          <Button disabled={VariableStore.listing ? true : false} variant={'outline'} onClick={() => { InitialList() }}>
            Refresar
          </Button>
          <Button onClick={() => { VariableStore.setCreateState({ openCreate: true }) }}>
            Crear Item
          </Button>
        </div>
      </div>

      <VariableList_
        isError={false}
        isLoading={VariableStore.listing}
        list={VariableStore.list}
        HandleDragEndEvent={() => { }}
        onClickDelete={(id, item) => {
          VariableStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
        onClickEdit={(id, item) => {
          VariableStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      />

      <VariableFooterTable
        HandleToNextPage={() => {
          if (!VariableStore.pagination) return;
          VariableStore.setListState({
            pagination: {
              ...VariableStore.pagination,
              page: VariableStore.pagination?.page + 1,
            }
          })
        }}
        HandleToPrevPage={() => {
          if (!VariableStore.pagination) return;
          VariableStore.setListState({
            pagination: {
              ...VariableStore.pagination,
              page: VariableStore.pagination?.page - 1,
            }
          })
        }}
        pagination={VariableStore.pagination}
      />
    </div>

    <DialogCreateVariable />
    <DialogUpdateVariable />
    <DialogConfirmDelete />
  </>
}