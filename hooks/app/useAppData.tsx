import { useWorkspaceSelectionStore } from "@/modules/app/stores/workspaceStore"
import { useAuthCydoStore } from "@/modules/auth/store/authStore"

//
// Cuando requiera la data compartida desde la aplicación
//

export const useAppData = () => {
  const authStore = useAuthCydoStore()
  const workspaceSelectionStore = useWorkspaceSelectionStore()

  const currentWorkspaceId = workspaceSelectionStore.selectedWorkspaceId;
  const workspaceData = workspaceSelectionStore.workspaces.find(el => el.id == currentWorkspaceId)

  return {
    user: authStore.basicUserInformation,
    workspace: workspaceData,
  }
}