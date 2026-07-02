import { create } from "zustand";
import { Workspace } from "../workspace";

interface WorkspaceSelectionState {
  workspaces: Workspace[];
  selectedWorkspaceId: string | null;
  setWorkspaces: (workspaces: Workspace[]) => void;
  setSelectedWorkspaceId: (workspaceId: string | null) => void;
}

export const useWorkspaceSelectionStore = create<WorkspaceSelectionState>((set) => ({
  workspaces: [],
  selectedWorkspaceId: null,
  setWorkspaces: (workspaces) =>
    set((state) => ({
      ...state,
      workspaces,
      selectedWorkspaceId: state.selectedWorkspaceId || workspaces[0]?.id || null,
    })),
  setSelectedWorkspaceId: (workspaceId) =>
    set(() => ({
      selectedWorkspaceId: workspaceId,
    })),
}));
