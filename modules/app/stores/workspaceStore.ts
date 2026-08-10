import { entityDTO } from "@/api/dataEngine/entity";
import { WorkspaceDTO } from "@/api/workspace/workspace.dto";
import { IWorkspaceSettings } from "@/api/workspace/workspace.settings";
import { create } from "zustand";

type workspaceCreationState = {
  loading: boolean;
  workspaceCreated: WorkspaceDTO | null;
  hasError: boolean;
  open: boolean;
}

interface WorkspaceSelectionState {
  currentWorkspaceSetting: IWorkspaceSettings | null,
  setWorkspaceSetting: (workspaceSetting: IWorkspaceSettings | null) => void;

  workspaces: WorkspaceDTO[];
  selectedWorkspaceId: string | null;
  setWorkspaces: (workspaces: WorkspaceDTO[]) => void;
  setSelectedWorkspaceId: (workspaceId: string | null) => void;
  // create workspace
  workspaceCreationState: workspaceCreationState,
  setworkspaceCreationState: (workspaceId: Partial<workspaceCreationState>) => void;
  reorderWorkspaces: (orderedIds: string[]) => void;
}

export const useWorkspaceSelectionStore = create<WorkspaceSelectionState>((set) => ({
  currentWorkspaceSetting: null,
  setWorkspaceSetting: (data) => set((state) => ({ ...state, currentWorkspaceSetting: data })),
  
  //
  workspaces: [],
  selectedWorkspaceId: null,
  setWorkspaces: (workspaces) =>
    set((state) => ({
      workspaces,
      selectedWorkspaceId: state.selectedWorkspaceId || workspaces[0]?.id || null,
    })),
  setSelectedWorkspaceId: (selectedWorkspaceId) =>
    set(() => ({ selectedWorkspaceId })),
  // creation
  workspaceCreationState: {
    hasError: false,
    loading: false,
    workspaceCreated: null,
    open: false,
  },
  setworkspaceCreationState: (data) => set((state) => {
    return {
      ...state,
      workspaceCreationState: {
        ...state.workspaceCreationState,
        ...data
      }
    }
  }),
  reorderWorkspaces: (orderedIds) => set((state) => {
    const ordered = orderedIds.map((id, index) => {
      const found = state.workspaces.find(w => w.id === id)
      return found ? { ...found, sortOrder: index } : null
    }).filter(Boolean) as WorkspaceDTO[]
    return { workspaces: ordered }
  }),
}));
