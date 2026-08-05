'use client'
/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Button } from "@/components/ui/button"
import { useAppData } from '@/hooks/app/useAppData'
import { useEffect } from 'react'
import { useFieldActions } from "../../actions/useFieldActions"
import { useEntityStore } from "../../store/entity.store"
import { useFieldStore } from "../../store/field.store"
import { DialogConfirmDelete } from "./dialogConfirmDelete"
import { DialogCreateField } from "./dialogCreateField"
import { DialogUpdateField } from "./dialogUpdateField"
import { FieldTable_ } from "./tableFields"

//___________ ___________ Main

type FieldProps = {

}

export const FieldSection = ({ }: FieldProps) => {
  const FieldStore = useFieldStore();
  const fieldActions = useFieldActions({})
  const entityStore = useEntityStore()
  const appData = useAppData()
  const InitialList = () => {
    fieldActions.listFieldAction({ page: 1, workspaceId: appData.workspace?.id || '', entityId: entityStore.currentElementSelected || '' })
  }

  const OnInit = () => {
    InitialList()
  }

  useEffect(() => {
    if (appData.workspace?.id && entityStore.currentElementSelected) OnInit()
  }, [appData.workspace?.id, entityStore.currentElementSelected])

  return <>
    <div className="p-2">
      <div className="flex justify-between gap-2 items-center mb-2">
        <div>
          <span className='text-foreground text-md font-semibold'>Listado de campos</span>
        </div>
        <div className='flex gap-2 items-center'>
          <Button disabled={FieldStore.listing ? true : false} variant={'secondary'} onClick={() => { InitialList() }}>
          Refresar
        </Button>
        <Button variant={'outline'} onClick={() => { FieldStore.setCreateState({ openCreate: true }) }}>
          Agregar Campo
        </Button>
        </div>
      </div>

      <FieldTable_
        isError={false}
        isLoading={FieldStore.listing}
        list={FieldStore.list}
        handleDelete={(id, item) => {
          FieldStore.setDeleteState({ currentElementSelected: item.id, openDelete: true })
        }}
        handleEdit={(id, item) => {
          FieldStore.setUpdateState({ currentElementSelected: item.id, openUpdate: true })
        }}
      />

      {/* <FieldFooterTable
        HandleToNextPage={() => {
          if (!FieldStore.pagination) return;
          FieldStore.setListState({
            pagination: {
              ...FieldStore.pagination,
              page: FieldStore.pagination?.page + 1,
            }
          })
        }}
        HandleToPrevPage={() => {
          if (!FieldStore.pagination) return;
          FieldStore.setListState({
            pagination: {
              ...FieldStore.pagination,
              page: FieldStore.pagination?.page - 1,
            }
          })
        }}
        pagination={FieldStore.pagination}
      /> */}
    </div>

    <DialogCreateField />
    <DialogUpdateField />
    <DialogConfirmDelete />
  </>
}