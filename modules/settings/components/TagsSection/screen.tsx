'use client'

import { useAppData } from "@/hooks/app/useAppData";
import { Button } from "@/components/ui/button"
import { useEffect } from "react";
import { useTagActions } from "./actions/useTagActions";
import { DialogConfirmDelete } from "./components/dialogConfirmDeleteTag";
import { DialogCreateTag } from "./components/dialogCreateTag";
import { DialogUpdateTag } from "./components/dialogUpdateTag";
import { TagList_, TagFooterTable } from "./components/List";
import { useTagStore } from "./store/tagStore";

type TagProps = {

}

export const TagSection = ({ }: TagProps) => {
  const appData = useAppData()
  const TagStore = useTagStore();
  const tagActions = useTagActions({})

  const InitialList = () => {
    tagActions.listTagAction({ page: 1, workspaceId: appData.workspace?.id || '' })
  }

  const OnInit = () => {
    InitialList()
  }

  useEffect(() => {
    OnInit()
  }, [])

  useEffect(() => {
    if (appData.workspace) OnInit()
  }, [appData.workspace])

  return <>
    <div className="p-2">
      <div className="flex justify-end gap-2 items-center mb-2">
        <Button disabled={TagStore.listing ? true : false} variant={'secondary'} onClick={() => { InitialList() }}>
          Refresar
        </Button>
        <Button onClick={() => { TagStore.setCreateState({ openCreate: true }) }}>
          Crear Item
        </Button>
      </div>

      <TagList_
        isError={false}
        isLoading={TagStore.listing}
        list={TagStore.list}
        HandleDragEndEvent={() => {}}
        onClickDelete={(id, item) => {
          TagStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
        onClickEdit={(id, item) => {
          TagStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      />

      <TagFooterTable
        HandleToNextPage={() => {
          if (!TagStore.pagination) return;
          TagStore.setListState({
            pagination: {
              ...TagStore.pagination,
              page: TagStore.pagination?.page + 1,
            }
          })
        }}
        HandleToPrevPage={() => {
          if (!TagStore.pagination) return;
          TagStore.setListState({
            pagination: {
              ...TagStore.pagination,
              page: TagStore.pagination?.page - 1,
            }
          })
        }}
        pagination={TagStore.pagination}
      />
    </div>

    <DialogCreateTag />
    <DialogUpdateTag />
    <DialogConfirmDelete />
  </>
}