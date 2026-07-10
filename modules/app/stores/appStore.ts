/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { WorkspaceSelectionDTO } from "../dto/dtos";

interface useAppStoreState {
  Breadcrum: Array<{ text: string, route: string | null }>
  setBreadcrum: (data: Array<{ text: string, route: string | null }>) => void
}

export const useAppStore = create<useAppStoreState>((set) => ({
  Breadcrum: [],
  setBreadcrum: (data: any) => set((state) => ({ ...state, Breadcrum: data }))
}));
