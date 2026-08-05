'use client'

/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Button } from "@/components/ui/button"
import { useEffect, } from "react"
import { useAppData } from "@/hooks/app/useAppData"
import { useEntityActions } from "../../actions/useEntityActions"
import { useEntityStore } from "../../store/entity.store"
import { DialogConfirmDelete } from "./dialogConfirmDeleteEntity"
import { DialogCreateEntity } from "./dialogCreateEntity"
import { DialogUpdateEntity } from "./dialogUpdateEntity"
import { EntityTable_, EntityFooterTable } from "./tableEntity"


//___________ ___________ Main

type EntityProps = {

}

export const EntityScreen = ({ }: EntityProps) => {
  const EntityStore = useEntityStore();
  const entityActions = useEntityActions({})
  const appData = useAppData()
  
  const InitialList = () => {
    entityActions.listEntityAction({ page: 1, workspaceId: appData.workspace?.id || '' })
  }

  const OnInit = () => {
    InitialList()
  }

  useEffect(() => {
    if (appData.workspace?.id) OnInit()
  }, [appData.workspace?.id])

  return <>
    <div className="p-2">
      <div className="flex justify-between gap-2 items-center mb-2">
        <div>
          <span className="text-foreground text-md font-semibold">Listado de bases de datos</span>
        </div>
        <div className="flex gap-2 items-center">
          <Button disabled={EntityStore.listing ? true : false} variant={'secondary'} onClick={() => { InitialList() }}>
          Refresar
        </Button>
        <Button onClick={() => { EntityStore.setCreateState({ openCreate: true }) }}>
          Crear base de dato
        </Button>
        </div>
      </div>

      {/* <EntityList_
        isError={false}
        isLoading={EntityStore.listing}
        list={EntityStore.list}
        HandleDragEndEvent={() => {}}
        onClickDelete={(id, item) => {
          EntityStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
        onClickEdit={(id, item) => {
          EntityStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      /> */}

      <EntityTable_
        isError={false}
        isLoading={EntityStore.listing}
        list={EntityStore.list}
        handleDelete={(id, item) => {
          EntityStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
        handleEdit={(id, item) => {
          EntityStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      />

      <EntityFooterTable
        HandleToNextPage={() => {
          if (!EntityStore.pagination) return;
          EntityStore.setListState({
            pagination: {
              ...EntityStore.pagination,
              page: EntityStore.pagination?.page + 1,
            }
          })
        }}
        HandleToPrevPage={() => {
          if (!EntityStore.pagination) return;
          EntityStore.setListState({
            pagination: {
              ...EntityStore.pagination,
              page: EntityStore.pagination?.page - 1,
            }
          })
        }}
        pagination={EntityStore.pagination}
      />
    </div>

    <DialogCreateEntity />
    <DialogUpdateEntity />
    <DialogConfirmDelete />
  </>
}