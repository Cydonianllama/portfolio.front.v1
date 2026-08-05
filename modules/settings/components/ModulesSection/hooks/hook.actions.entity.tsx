/* eslint-disable @typescript-eslint/no-empty-object-type */

// #region Hooks
//___________ hooks
// import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { entityDTO, CreateentityRequestDTO, Createentity, UpdateentityRequestDTO, Updateentity, GetentitysRequestDTO, Getentity, DeleteentityRequestDTO, Deleteentity } from "@/api/dataEngine/entity"
import { useAppData } from "@/hooks/app/useAppData"
import { useEntityStore } from "../store/entity.store"
import { useCallback } from "react"
import { eventBus } from "@/utils/eventBus"

export type UseEntityActionsProps = {

}

export const UseEntityActions = ({ }: UseEntityActionsProps) => {
  const EntityStore = useEntityStore();

  const createEntityAction = useCallback(async (data: CreateentityRequestDTO) => {
    try {
      EntityStore.setCreateState({ creating: true })
      const reqCreation = await Createentity(data);

      if (!reqCreation?.status) {
        toast.error('[error 1]')
      }

      if (!reqCreation?.data) {
        toast.error('[error 2]')
      }

      if (reqCreation?.data.entity && reqCreation.status) {
        const list = [reqCreation?.data.entity, ...EntityStore.list]
        EntityStore.setListState({ list: list })
        toast.success('Modulo creado')

        eventBus.emit('entityCreated', reqCreation.data.entity)
      }

    } catch (ex) {

    } finally {
      EntityStore.setCreateState({ creating: false, openCreate: false })
    }
  }, [EntityStore.list])

  const updateEntityAction = useCallback(async (id: string, data: UpdateentityRequestDTO) => {
    try {
      EntityStore.setUpdateState({ updating: true })
      const reqUpdate = await Updateentity(id, data);

      if (!reqUpdate?.status) {
        toast.error('[error 1]')
      }

      if (!reqUpdate?.data) {
        toast.error('[error 2]')
      }

      if (reqUpdate?.status && reqUpdate.data.entity) {
        let list = [...EntityStore.list]
        list = list.map(el => {
          if (el.id == id) {
            return reqUpdate.data.entity || el
          } else {
            return el;
          }
        })
        EntityStore.setListState({ list: list })
        toast.success('Item actualizado')
      }

    } catch (ex) {

    } finally {
      EntityStore.setUpdateState({ updating: false, openUpdate: false })
    }
  }, [EntityStore.list])

  const listEntityAction = useCallback(async (data: GetentitysRequestDTO) => {
    try {
      EntityStore.setListState({ listing: true })

      if (data.page == 1) {
        EntityStore.setListState({ list: [] })
      }

      const reqList = await Getentity(data)

      if (!reqList?.status) {
        toast.error('[error 1]')
      }

      if (!reqList?.data) {
        toast.error('[error 2]')
      }

      if (reqList?.status && reqList.data.list) {
        EntityStore.setListState({ pagination: reqList.pagination || null })
        if (data.page == 1) {
          EntityStore.setListState({ list: reqList.data.list })
        } else {
          EntityStore.setListState({ list: [...EntityStore.list, ...reqList.data.list] })
        }
      }

    } catch (ex) {

    } finally {
      EntityStore.setListState({ listing: false })
    }
  }, [])

  const deleteEntityAction = useCallback(async (data: DeleteentityRequestDTO) => {
    try {
      EntityStore.setDeleteState({ deleting: true })
      const reqDelete = await Deleteentity(data)

      if (!reqDelete?.status) {
        toast.error('[error 1]')
      }

      if (!reqDelete?.data) {
        toast.error('[error 2]')
      }

      if (reqDelete?.status && reqDelete.data) {
        let list = [...EntityStore.list]
        list = list.filter(el => el.id != data.id)
        EntityStore.setListState({ list: list })
        toast.success('Item eliminado')
      }
    } catch (ex) {

    } finally {
      EntityStore.setDeleteState({ deleting: false, openDelete: false })
    }
  }, [EntityStore.list])

  return {
    createEntityAction,
    updateEntityAction,
    listEntityAction,
    deleteEntityAction,
  }
}
// #endregion Hooks