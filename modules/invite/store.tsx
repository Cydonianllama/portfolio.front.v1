// _____________ store
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ResponsePagination } from "@/types/api/utils.pagination"

type testEntity = { id: string, name: string }

interface InviteStore {
  currentElementSelected: string | null

  // getall
  list: Array<testEntity>
  pagination: ResponsePagination | null;
  listing: boolean;
  setListState: (data: Partial<{ list: Array<testEntity>, listing: boolean, pagination: ResponsePagination | null }>) => void

}

export const useInvite = create<InviteStore>((set) => ({
  currentElementSelected: null,

  // getall
  list: [],
  listing: false,
  pagination: null,
  setListState: (data) => set((state) => ({ ...state, ...data })),
}));
