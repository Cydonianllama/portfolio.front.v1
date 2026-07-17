// _____________ store
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ResponsePagination } from "@/types/api/utils.pagination"

interface ProfileSettingsStore {
  // delete
  openDelete: boolean;
  deleting: boolean;
  setDeleteState: (data: Partial<{ openDelete: boolean, deleting: boolean }>) => void

}

export const useProfileSettings = create<ProfileSettingsStore>((set) => ({
  //delete
  openDelete: false,
  deleting: false,
  setDeleteState: (data) => set((state) => ({ ...state, ...data })),
}));
