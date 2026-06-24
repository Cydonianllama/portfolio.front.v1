"use client"

import { useEffect, useState } from "react";

// components
import { Separator } from "@/components/ui/separator"
import { Header } from "./section.header";
import { SectionList } from "./section.list";
import { CreateItem, DeleteItem, GetItem, UpdateItem } from "../services";
import { useManagerv1Store } from "../store";
import { ManagerV1DialogEdit } from "./dialog.edit";
import { ManagerV1DialogCreate } from "./dialog.create";
import { ManagerV1DialogConfirmDelete } from "./dialog.confirmdelete";

// dnd
import { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { ItemDTO } from "../dto";
import { CreationSchema } from "../schemas/item.creation";
import { UpdateSchema } from "../schemas/item.update";
import { toast } from "sonner";

//
// Screen
//

export const ListItemScreen = () => {

  const [page, setPage] = useState(1)
  const [textQuery, setTextQuery] = useState('')

  const state = useManagerv1Store()

  const ListItems = async () => {
    try {
      state.setinformationListItem({ loading: true, hasError: false, errorMessage: '' })
      const req = await GetItem({ page: page, query: textQuery })

      if (!req?.status) {
        state.setinformationListItem({ hasError: true, errorMessage: 'No obtuvimos data' })
        return;
      }

      if (!req?.data) {
        state.setinformationListItem({ hasError: true, errorMessage: 'No obtuvimos data' })
        return;
      }

      if (req.data) {
        state.setinformationListItem({ list: req.data.list || [], pagination: req.pagination || null })
      }


    } catch (error) {
      state.setinformationListItem({ hasError: true, errorMessage: 'Error inesperado' })
    } finally {
      state.setinformationListItem({ loading: false })
    }
  }

  //
  // ON INIT
  //

  useEffect(() => {
    ListItems()
  }, [])

  //
  // HEADER
  //

  const HandleSearch = (text: string) => {
    setPage(1)
    setTextQuery(text)
    ListItems()
  }

  const HandleToRefresh = () => {
    setPage(1)
    setTextQuery('')
    ListItems()
  }

  const HandleClickCreate = () => {
    state.setinformationCreationItem({ isOpen: true })
  }

  //
  // Section list
  //

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const _list = [...state.informationListItem.list]
    const oldIndex = _list.findIndex((el) => el.id == active.id as string);
    const newIndex = _list.findIndex((el) => el.id == over.id as string);

    state.setinformationListItem({
      list: arrayMove(_list, oldIndex, newIndex)
    })
  };

  //
  // CREATE
  //
  const HandleOpenDialogCreate = (open: boolean) => {
    state.setinformationCreationItem({ isOpen: open })
  }

  const HandleCreate = async (data: CreationSchema) => {
    try {

      state.setinformationCreationItem({ loading: true, hasError: false })

      const req = await CreateItem({
        color: data.color || '',
        name: data.name || ''
      })

      if (!req) {
        toast.error('Error 1')
        return;
      }

      if (!req.status) {
        toast.error('Error 2')
        return;
      }

      if (!req.data) {
        toast.error('Error 3')
        return;
      }

      toast.success('Exito')

      const list_ = [...state.informationListItem.list]
      if (req.data.item_to_update) list_.unshift(req.data.item_to_update)
      state.setinformationListItem({ list: list_ })

    } catch (error) {
      state.setinformationCreationItem({ hasError: true })
    } finally {
      state.setinformationCreationItem({ isOpen: false, loading: false })
    }
  }

  //
  // UPDATE
  //

  const HandleOpenEdit = (open: boolean) => {
    state.setinformationUpdateItem({ isOpen: open })
  }

  const HandleUpdate = async (data: UpdateSchema) => {
    try {

      state.setinformationUpdateItem({ loading: true, hasError: false })

      const req = await UpdateItem({
        color: data.color || '',
        id: state.informationUpdateItem.itemId || '',
        name: data.name || ''
      })

      if (!req) {
        toast.error('Error 1')
        return;
      }

      if (!req.status) {
        toast.error('Error 2')
        return;
      }

      if (!req.data) {
        toast.error('Error 3')
        return;
      }

      toast.success('Exito')

      // update
      let list_ = [...state.informationListItem.list]
      list_ = list_.map(el => {
        if (el.id == state.informationUpdateItem.itemId){
          return req.data.item_to_update || el
        } else return el
      })
      state.setinformationListItem({ list: list_ })

    } catch (error) {
      state.setinformationUpdateItem({ hasError: true })
    } finally {
      state.setinformationUpdateItem({ isOpen: false, itemId: null, itemData: null, loading: false })
    }
  }


  //
  // DELETE
  //

  const HandleOpenDelete = (open: boolean) => {
    state.setinformationDeleteItem({ isOpen: open })
  }

  const HandleDelete = async () => {
    try {
      // state.setinformationDeleteItem({})
      state.setinformationDeleteItem({ loading: true, hasError: false })
      const req = await DeleteItem({
        id: state.informationDeleteItem.itemId || ''
      })

      if (!req) {
        toast.error('Error 1')
        return;
      }

      if (!req.status) {
        toast.error('Error 2')
        return;
      }

      if (!req.data) {
        toast.error('Error 3')
        return;
      }

      toast.success('Exito')

      // remover
      let list_ = [...state.informationListItem.list]
      list_ = list_.filter(el => el.id == state.informationDeleteItem.itemId)
      state.setinformationListItem({ list: list_ })

    } catch (error) {
      state.setinformationDeleteItem({ hasError: true })
    } finally {
      state.setinformationDeleteItem({ isOpen: false, itemData: null, itemId: null })
    }
  }


  //
  // ITEM
  //
  const onClickEdit = (id: string, item: ItemDTO) => {
    state.setinformationUpdateItem({ isOpen: true, itemId: id, itemData: item })
  }

  const onClickDelete = (id: string, item: ItemDTO) => {
    state.setinformationDeleteItem({ isOpen: true, itemId: id, itemData: item })
  }

  return (<>

    <div className="relative h-full px-60 flex flex-col gap-3 pb-20">
      {/*  */}
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl">Labels</h1>
          <p className="text-md">Manage team <strong>Company</strong> specific labels.</p>
        </div>

        <Separator />

        <div className="gap-1.5 flex flex-col">
          <p className="text-md">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi repudiandae aut dolorum officiis laudantium veritatis saepe sapiente! Quibusdam voluptates nihil quia id sequi animi sit labore. Optio, obcaecati! Ab fugiat officia itaque.</p>
          <p className="text-md">Lorem ipsum dolor sit  veritatis saepe sapiente! Quibusdam voluptates nihil quia id sequi animi sit labore. Optio, <strong>obcaecati! Ab fugiat officia itaque.</strong></p>
        </div>
      </section>
      {/*  */}

      {/*  */}
      <Header
        onClickAdd={HandleClickCreate}
        onClickRefresh={HandleToRefresh}
        onSearh={HandleSearch}
      />
      {/*  */}

      {/*  */}
      <SectionList
        // isError={(state.informationListItem.hasError) ? true : false}
        isError={false}
        isLoading={state.informationListItem.loading}
        list={state.informationListItem.list}
        HandleDragEndEvent={handleDragEnd}
        onClickDelete={onClickDelete}
        onClickEdit={onClickEdit}
      />
      {/*  */}

      {/* start::Dialogs */}
      <ManagerV1DialogConfirmDelete
        deleting={state.informationDeleteItem.loading}
        onDelete={HandleDelete}
        open={state.informationDeleteItem.isOpen}
        setOpen={HandleOpenDelete}
      />
      <ManagerV1DialogCreate
        onCreate={HandleCreate}
        open={state.informationCreationItem.isOpen}
        setOpen={HandleOpenDialogCreate}
        creating={state.informationCreationItem.loading}
      />
      <ManagerV1DialogEdit
        onUpdate={HandleUpdate}
        open={state.informationUpdateItem.isOpen}
        setOpen={HandleOpenEdit}
        updating={state.informationUpdateItem.loading}
        data={state.informationUpdateItem.itemData}
      />
      {/* end::Dialogs */}
    </div>

  </>)
}