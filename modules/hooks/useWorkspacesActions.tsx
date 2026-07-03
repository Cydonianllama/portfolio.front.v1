import { useCallback } from "react"
import { useWorkspaceSelectionStore } from "../app/stores/workspaceStore"

export const UseWorkspacesAction = () => {

  const worksacesStore = useWorkspaceSelectionStore()

  const OpenWorkspace = useCallback((workspaceId: string) => {
    //
    console.log('OpenWorkspace')
    worksacesStore.setSelectedWorkspaceId(workspaceId)
  }, [])


  return {
    OpenWorkspace
  }
}