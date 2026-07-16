/* eslint-disable @typescript-eslint/no-empty-object-type */
// _____________ store
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ResponsePagination } from "@/types/api/utils.pagination"

interface SubscriptionStore {
  // getall
  // list: Array<testEntity>
  // pagination: ResponsePagination | null;
  // listing: boolean;
  // setListState: (data: Partial<{ list: Array<testEntity>, listing: boolean, pagination: ResponsePagination | null }>) => void
}

export const useSubscription = create<SubscriptionStore>((set) => ({
  // getall
  // list: [],
  // listing: false,
  // pagination: null,
  // setListState: (data) => set((state) => ({ ...state, ...data })),
}));
