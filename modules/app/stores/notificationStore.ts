// _____________ store
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ResponsePagination } from "@/types/api/utils.pagination"
import { ActivityDTO } from "@/api/activity/dto";


interface NotificationStore {
  // getall
  list: Array<ActivityDTO>
  pagination: ResponsePagination | null;
  listing: boolean;
  setListState: (data: Partial<{ list: Array<ActivityDTO>, listing: boolean, pagination: ResponsePagination | null }>) => void
}

export const useNotification = create<NotificationStore>((set) => ({
  // getall
  list: [],
  listing: false,
  pagination: null,
  setListState: (data) => set((state) => ({ ...state, ...data })),
}));
