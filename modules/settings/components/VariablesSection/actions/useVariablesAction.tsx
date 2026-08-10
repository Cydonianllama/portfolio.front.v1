import { toast } from "sonner"
import { CreateVariable, UpdateVariable, GetVariables, DeleteVariable } from "@/api/variable/variable.api"
import { useCallback } from "react"
import { useVariableStore } from "../store/variableStore"
import { CreateVariableRequestDTO, UpdateVariableRequestDTO, GetVariablesRequestDTO, DeleteVariableRequestDTO } from "@/api/variable/variable.dto"

export type UseVariablesActionsProps = {

}

export const UseVariablesActions = ({ }: UseVariablesActionsProps) => {
  const VariableStore = useVariableStore();

  const createVariablesAction = useCallback(async (data: CreateVariableRequestDTO) => {
    try {
      VariableStore.setCreateState({ creating: true })
      const reqCreation = await CreateVariable(data);

      if (!reqCreation?.status) {
        toast.error('[error 1]')
      }

      if (!reqCreation?.data) {
        toast.error('[error 2]')
      }

      if (reqCreation?.data.variable && reqCreation.status) {
        const list = [reqCreation?.data.variable, ...VariableStore.list]
        VariableStore.setListState({ list: list })
        toast.success('Item creado')
      }

    } catch (ex) {

    } finally {
      VariableStore.setCreateState({ creating: false, openCreate: false })
    }
  }, [VariableStore.list])

  const updateVariablesAction = useCallback(async (id: string, data: UpdateVariableRequestDTO) => {
    try {
      VariableStore.setUpdateState({ updating: true })
      const reqUpdate = await UpdateVariable(id, data);

      if (!reqUpdate?.status) {
        toast.error('[error 1]')
      }

      if (!reqUpdate?.data) {
        toast.error('[error 2]')
      }

      if (reqUpdate?.status && reqUpdate.data.variable) {
        let list = [...VariableStore.list]
        list = list.map(el => {
          if (el.id == id) {
            return reqUpdate.data.variable || el
          } else {
            return el;
          }
        })
        VariableStore.setListState({ list: list })
        toast.success('Item actualizado')
      }

    } catch (ex) {

    } finally {
      VariableStore.setUpdateState({ updating: false, openUpdate: false })
    }
  }, [VariableStore.list])

  const listVariablesAction = useCallback(async (data: GetVariablesRequestDTO) => {
    try {
      VariableStore.setListState({ listing: true })

      if (data.page == 1) {
        VariableStore.setListState({ list: [] })
      }

      const reqList = await GetVariables(data)

      if (!reqList?.status) {
        toast.error('[error 1]')
      }

      if (!reqList?.data) {
        toast.error('[error 2]')
      }

      if (reqList?.status && reqList.data.list) {
        VariableStore.setListState({ pagination: reqList.pagination || null })
        if (data.page == 1) {
          VariableStore.setListState({ list: reqList.data.list })
        } else {
          VariableStore.setListState({ list: [...VariableStore.list, ...reqList.data.list] })
        }
      }

    } catch (ex) {

    } finally {
      VariableStore.setListState({ listing: false })
    }
  }, [])

  const deleteVariablesAction = useCallback(async (data: DeleteVariableRequestDTO) => {
    try {
      VariableStore.setDeleteState({ deleting: true })
      const reqDelete = await DeleteVariable(data)

      if (!reqDelete?.status) {
        toast.error('[error 1]')
      }

      if (!reqDelete?.data) {
        toast.error('[error 2]')
      }

      if (reqDelete?.status && reqDelete.data) {
        let list = [...VariableStore.list]
        list = list.filter(el => el.id != data.id)
        VariableStore.setListState({ list: list })
        toast.success('Item eliminado')
      }
    } catch (ex) {

    } finally {
      VariableStore.setDeleteState({ deleting: false, openDelete: false })
    }
  }, [VariableStore.list])

  return {
    createVariablesAction,
    updateVariablesAction,
    listVariablesAction,
    deleteVariablesAction,
  }
}