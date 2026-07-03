import { create } from "zustand";
import { WorkspaceSelectionDTO } from "../dto/dtos";

interface WorkspaceSelectionState {
  workspaces: WorkspaceSelectionDTO[];
  selectedWorkspaceId: string | null;
  setWorkspaces: (workspaces: WorkspaceSelectionDTO[]) => void;
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
