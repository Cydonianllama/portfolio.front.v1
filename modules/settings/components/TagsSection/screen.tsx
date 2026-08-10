'use client'

import { useAppData } from "@/hooks/app/useAppData";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect } from "react";
import { useTagActions } from "./actions/useTagActions";
import { DialogConfirmDelete } from "./components/dialogConfirmDeleteTag";
import { DialogCreateTag } from "./components/dialogCreateTag";
import { DialogUpdateTag } from "./components/dialogUpdateTag";
import { TagList_, TagFooterTable } from "./components/List";
import { useTagStore } from "./store/tagStore";
import { FiSearch, FiX } from "react-icons/fi";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

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

  const HandleDragEndEvent = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = TagStore.list.findIndex((item) => item.id === active.id);
    const newIndex = TagStore.list.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newList = arrayMove([...TagStore.list], oldIndex, newIndex);
    const orderedIds = newList.map(el => el.id);

    await tagActions.reorderTagAction(appData.workspace?.id || '', orderedIds);
  }

  const filteredList = TagStore.list.filter(el =>
    el.name.toLowerCase().includes(TagStore.searchQuery.toLowerCase())
  );

  return <>
    <div className="">
      <div className="flex justify-between gap-2 items-center mb-2">
        <div className="flex gap-2 items-center flex-1">
          <div className="relative flex-1 max-w-xs">
            <Input
              placeholder="Buscar..."
              value={TagStore.searchQuery}
              onChange={(e) => TagStore.setSearchQuery(e.target.value)}
              className="pl-8 pr-8"
            />
            <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            {TagStore.searchQuery && (
              <button
                onClick={() => TagStore.setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button disabled={TagStore.listing ? true : false} variant={'outline'} onClick={() => { InitialList() }}>
            Refresar
          </Button>
          <Button onClick={() => { TagStore.setCreateState({ openCreate: true }) }}>
            Crear Item
          </Button>
        </div>
      </div>

      <TagList_
        isError={false}
        isLoading={TagStore.listing}
        list={filteredList}
        HandleDragEndEvent={HandleDragEndEvent}
        onClickDelete={(id, item) => {
          TagStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
        onClickEdit={(id, item) => {
          TagStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      />
    </div>

    <DialogCreateTag />
    <DialogUpdateTag />
    <DialogConfirmDelete />
  </>
}