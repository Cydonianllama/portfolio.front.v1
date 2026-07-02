import { create } from "zustand";
import { Workspace } from "@/modules/showcase/workspace";

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
      workspaces,
      selectedWorkspaceId: state.selectedWorkspaceId || workspaces[0]?.id || null,
    })),
  setSelectedWorkspaceId: (selectedWorkspaceId) =>
    set(() => ({ selectedWorkspaceId })),
}));
