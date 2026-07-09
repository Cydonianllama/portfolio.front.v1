import { create } from "zustand";
import { WorkspaceSelectionDTO } from "../dto/dtos";

interface useAppStoreState {
  test: string;
  setTest: (test: string) => void;
}

export const useAppStore = create<useAppStoreState>((set) => ({
  test: '',
  setTest: (test) => set((state) => ({ ...state, test }))
}));
