import { CreateWorkspace } from "@/api/workspace/workspace.api";
import { CreateWorkspaceDto } from "@/api/workspace/workspace.dto";
import { UseWorkspacesAction } from "@/modules/app/actions/useWorkspacesActions";
import { useWorkspaceSelectionStore } from "../stores/workspaceStore";

export function useAppActions() {
  const workspaceActions = UseWorkspacesAction()
  const appWorkspacesStore = useWorkspaceSelectionStore();

  const createWorkspaceFromDropdownAction = async (data: CreateWorkspaceDto) => {
    try {
      const reqWorkspace = await CreateWorkspace({
        name: data.name
      })

      if (!reqWorkspace) {
        return;
      }

      if (!reqWorkspace.status) {
        return;
      }

      if (!reqWorkspace.data?.workspace) {
        return;
      }

      const newWorkspace = reqWorkspace.data.workspace

      appWorkspacesStore.setWorkspaces([{ id: newWorkspace.id, logoURL: newWorkspace.logoURL, name: newWorkspace.name }, ...appWorkspacesStore.workspaces])

      workspaceActions.OpenWorkspace(newWorkspace.id)

    } catch (ex) {

    } finally {
      appWorkspacesStore.setworkspaceCreationState({
        open: false
      })
    }
  }

  return {
    createWorkspaceFromDropdownAction
  }
}