/* eslint-disable @typescript-eslint/no-empty-object-type */
import { CreateAutomation, GetAutomation, DeleteAutomation } from "@/api/automation/api";
import { UpdateAutomation } from "@/api/automation/automation.api";
import { CreateAutomationRequestDTO, UpdateAutomationRequestDTO, GetAutomationsRequestDTO, DeleteAutomationRequestDTO } from "@/api/automation/dto";
import { useCallback } from "react";
import { toast } from "sonner"
import { automationStore } from "../store/automationStore";

export type UseEntityNameActionsProps = {

}

export const useAutmationActions = ({ }: UseEntityNameActionsProps) => {
  const AutomationStore = automationStore();

  const createEntityNameAction = useCallback(async (data: CreateAutomationRequestDTO) => {
    try {
      AutomationStore.setCreateState({ creating: true })
      const reqCreation = await CreateAutomation(data);

      if (!reqCreation?.status) {
        toast.error('[error 1]')
      }

      if (!reqCreation?.data) {
        toast.error('[error 2]')
      }

      if (reqCreation?.data.automation && reqCreation.status) {
        const list = [reqCreation?.data.automation, ...AutomationStore.list]
        AutomationStore.setListState({ list: list })
        toast.success('Item creado')
      }

    } catch (ex) {

    } finally {
      AutomationStore.setCreateState({ creating: false, openCreate: false })
    }
  }, [AutomationStore.list])

  const updateEntityNameAction = useCallback(async (id: string, data: UpdateAutomationRequestDTO) => {
    try {
      AutomationStore.setUpdateState({ updating: true })
      const reqUpdate = await UpdateAutomation(id, data);

      if (!reqUpdate?.status) {
        toast.error('[error 1]')
      }

      if (!reqUpdate?.data) {
        toast.error('[error 2]')
      }

      if (reqUpdate?.status && reqUpdate.data.automation) {
        let list = [...AutomationStore.list]
        list = list.map(el => {
          if (el.id == id) {
            return reqUpdate.data.automation || el
          } else {
            return el;
          }
        })
        AutomationStore.setListState({ list: list })
        toast.success('Item actualizado')
      }

    } catch (ex) {

    } finally {
      AutomationStore.setUpdateState({ updating: false, openUpdate: false })
    }
  }, [AutomationStore.list])

  const listEntityNameAction = useCallback(async (data: GetAutomationsRequestDTO) => {
    try {
      AutomationStore.setListState({ listing: true })

      if (data.page == 1) {
        AutomationStore.setListState({ list: [] })
      }

      const reqList = await GetAutomation(data)

      if (!reqList?.status) {
        toast.error('[error 1]')
      }

      if (!reqList?.data) {
        toast.error('[error 2]')
      }

      if (reqList?.status && reqList.data.list) {
        AutomationStore.setListState({ pagination: reqList.pagination || null })
        if (data.page == 1) {
          AutomationStore.setListState({ list: reqList.data.list })
        } else {
          AutomationStore.setListState({ list: [...AutomationStore.list, ...reqList.data.list] })
        }
      }

    } catch (ex) {

    } finally {
      AutomationStore.setListState({ listing: false })
    }
  }, [])

  const deleteEntityNameAction = useCallback(async (data: DeleteAutomationRequestDTO) => {
    try {
      AutomationStore.setDeleteState({ deleting: true })
      const reqDelete = await DeleteAutomation(data)

      if (!reqDelete?.status) {
        toast.error('[error 1]')
      }

      if (!reqDelete?.data) {
        toast.error('[error 2]')
      }

      if (reqDelete?.status && reqDelete.data) {
        let list = [...AutomationStore.list]
        list = list.filter(el => el.id != data.id)
        AutomationStore.setListState({ list: list })
        toast.success('Item eliminado')
      }
    } catch (ex) {

    } finally {
      AutomationStore.setDeleteState({ deleting: false, openDelete: false })
    }
  }, [AutomationStore.list])

  return {
    createEntityNameAction,
    updateEntityNameAction,
    listEntityNameAction,
    deleteEntityNameAction,
  }
}
