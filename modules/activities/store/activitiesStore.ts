// _____________ store
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ResponsePagination } from "@/types/api/utils.pagination"
import { NotificationDTO } from "@/api/notification/dto";

interface ActivitiesStore {
  // getall
  list: Array<NotificationDTO>
  pagination: ResponsePagination | null;
  listing: boolean;
  setListState: (data: Partial<{ list: Array<NotificationDTO>, listing: boolean, pagination: ResponsePagination | null }>) => void
}

export const useActivities = create<ActivitiesStore>((set) => ({
  // getall
  list: [],
  listing: false,
  pagination: null,
  setListState: (data) => set((state) => ({ ...state, ...data })),
}));
