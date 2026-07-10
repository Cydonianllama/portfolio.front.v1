import { WorkspaceDTO } from "@/api/workspace/workspace.dto";
import { create } from "zustand";

type workspaceCreationState = {
  loading: boolean;
  workspaceCreated: WorkspaceDTO |  null;
  hasError: boolean;
  open: boolean;
}

interface WorkspaceSelectionState {
  workspaces: WorkspaceDTO[];
  selectedWorkspaceId: string | null;
  setWorkspaces: (workspaces: WorkspaceDTO[]) => void;
  setSelectedWorkspaceId: (workspaceId: string | null) => void;
  // create workspace
  workspaceCreationState: workspaceCreationState,
  setworkspaceCreationState: (workspaceId: Partial<workspaceCreationState>) => void;
}

export const useWorkspaceSelectionStore = create<WorkspaceSelectionState>((set) => ({
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
  })
}));
