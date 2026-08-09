import { UpdateUserRequestDTO } from "@/api/user/user.dto"
import { UpdateWorkspace } from "@/api/workspace/workspace.api"
import { UpdateWorkspaceRequestDTO } from "@/api/workspace/workspace.dto"
import { FieldToArray } from "@/types/types"
import { useCallback } from "react"
import { useAppData } from "../../../hooks/app/useAppData"
import { UpdateUser } from "@/api/user/user.api"
import { useWorkspaceSelectionStore } from "@/modules/app/stores/workspaceStore"
import { useAuthCydoStore } from "@/modules/auth/store/authStore"

export const useSettingsActions = () => {
  const { user, workspace } = useAppData()
  const workspaceSelection = useWorkspaceSelectionStore()
  const authStore = useAuthCydoStore()

  const updateParamWorkspace = useCallback(async (data: FieldToArray<UpdateWorkspaceRequestDTO>[]) => {
    try {
      const update = await UpdateWorkspace(workspace?.id || '', data);
      if (!update) {
        return;
      }

      if (!update.status) {
        return;
      }

      if (update.data.workspace) {
        let workspaces = [...workspaceSelection.workspaces]
        workspaces = workspaces.map(el => {
          if (el.id == workspace?.id) {
            return update.data.workspace
          } else {
            return el
          }
        })
        workspaceSelection.setWorkspaces(workspaces)
      }

    } catch (ex) {

    }
  }, [workspace?.id])

  const updateParamUser = useCallback(async (data: FieldToArray<UpdateUserRequestDTO>[]) => {
    try {
      const update = await UpdateUser(user.id, data)
      if (!update) {
        return;
      }

      if (!update.status) {
        return;
      }

      if (update.data.user){
        authStore.setBasicUserInformation(update.data.user)
      }
    } catch (ex) {

    }
  }, [user.id])

  return {
    updateParamUser,
    updateParamWorkspace,
  }
}