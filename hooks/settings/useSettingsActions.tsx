import { UserDTO } from "@/api/user/user.dto"
import { UpdateWorkspace } from "@/api/workspace/workspace.api"
import { UpdateWorkspaceRequestDTO } from "@/api/workspace/workspace.dto"
import { WorkspaceDTO } from "@/backoffice/workspaces/models/dto"
import { FieldToArray } from "@/types/types"
import { useCallback } from "react"
import { UseAppData } from "../app/useAppData"

export const UseSettingsActions = () => {

  const { user } = UseAppData()

  const updateParamUser = useCallback(async (data: FieldToArray<UpdateWorkspaceRequestDTO>[]) => {
    try {
      const update = await UpdateWorkspace(user.id, data);

    } catch (ex) {

    }
  }, [user])

  const updateParamWorkspace = useCallback(async (data: Partial<WorkspaceDTO>) => {
    try {

    } catch (ex) {

    }
  }, [])

  return {
    updateParamUser,
    updateParamWorkspace,
  }
}