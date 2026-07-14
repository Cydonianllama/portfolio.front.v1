/* eslint-disable @typescript-eslint/no-empty-object-type */
// _____________ store
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ResponsePagination } from "@/types/api/utils.pagination"

interface ForgetPassStore {

  // delete
  // openDelete: boolean;
  code: string;
  changing: boolean;
  setState: (data: Partial<{ code: string, changing: boolean }>) => void

}

export const useForgetPass = create<ForgetPassStore>((set) => ({
  //delete
  // openDelete: false,
  code: '',
  changing: false,
  setState: (data) => set((state) => ({ ...state, ...data })),
}));
