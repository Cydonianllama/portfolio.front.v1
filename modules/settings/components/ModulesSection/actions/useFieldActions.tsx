/* eslint-disable @typescript-eslint/no-empty-object-type */
//___________ hooks
// import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { CreateFieldRequestDTO, CreateField, UpdateFieldRequestDTO, UpdateField, GetFieldsRequestDTO, GetField, DeleteFieldRequestDTO, DeleteField } from '@/api/dataEngine/field'
import { useFieldStore } from "../store/field.store"
import { useCallback } from "react"

export type useFieldActionsProps = {

}

export const useFieldActions = ({ }: useFieldActionsProps) => {
  const FieldStore = useFieldStore();

  const createFieldAction = useCallback(async (data: CreateFieldRequestDTO) => {
    try {
      FieldStore.setCreateState({ creating: true })
      const reqCreation = await CreateField(data);

      if (!reqCreation?.status) {
        toast.error('[error 1]')
      }

      if (!reqCreation?.data) {
        toast.error('[error 2]')
      }

      if (reqCreation?.data.field && reqCreation.status) {
        const list = [reqCreation?.data.field, ...FieldStore.list]
        FieldStore.setListState({ list: list })
        toast.success('Item creado')
      }

    } catch (ex) {

    } finally {
      FieldStore.setCreateState({ creating: false, openCreate: false })
    }
  }, [FieldStore.list])

  const updateFieldAction = useCallback(async (id: string, data: UpdateFieldRequestDTO) => {
    try {
      FieldStore.setUpdateState({ updating: true })
      const reqUpdate = await UpdateField(id, data);

      if (!reqUpdate?.status) {
        toast.error('[error 1]')
      }

      if (!reqUpdate?.data) {
        toast.error('[error 2]')
      }

      if (reqUpdate?.status && reqUpdate.data.field) {
        let list = [...FieldStore.list]
        list = list.map(el => {
          if (el.id == id) {
            return reqUpdate.data.field || el
          } else {
            return el;
          }
        })
        FieldStore.setListState({ list: list })
        toast.success('Item actualizado')
      }

    } catch (ex) {

    } finally {
      FieldStore.setUpdateState({ updating: false, openUpdate: false })
    }
  }, [FieldStore.list])

  const listFieldAction = useCallback(async (data: GetFieldsRequestDTO) => {
    try {
      FieldStore.setListState({ listing: true })

      if (data.page == 1) {
        FieldStore.setListState({ list: [] })
      }

      const reqList = await GetField(data)

      if (!reqList?.status) {
        toast.error('[error 1]')
      }

      if (!reqList?.data) {
        toast.error('[error 2]')
      }

      if (reqList?.status && reqList.data.list) {
        FieldStore.setListState({ pagination: reqList.pagination || null })
        if (data.page == 1) {
          FieldStore.setListState({ list: reqList.data.list })
        } else {
          FieldStore.setListState({ list: [...FieldStore.list, ...reqList.data.list] })
        }
      }

    } catch (ex) {

    } finally {
      FieldStore.setListState({ listing: false })
    }
  }, [])

  const deleteFieldAction = useCallback(async (data: DeleteFieldRequestDTO) => {
    try {
      FieldStore.setDeleteState({ deleting: true })
      const reqDelete = await DeleteField(data)

      if (!reqDelete?.status) {
        toast.error('[error 1]')
      }

      if (!reqDelete?.data) {
        toast.error('[error 2]')
      }

      if (reqDelete?.status && reqDelete.data) {
        let list = [...FieldStore.list]
        list = list.filter(el => el.id != data.id)
        FieldStore.setListState({ list: list })
        toast.success('Item eliminado')
      }
    } catch (ex) {

    } finally {
      FieldStore.setDeleteState({ deleting: false, openDelete: false })
    }
  }, [FieldStore.list])

  return {
    createFieldAction,
    updateFieldAction,
    listFieldAction,
    deleteFieldAction,
  }
}