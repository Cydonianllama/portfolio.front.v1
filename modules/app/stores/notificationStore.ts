// _____________ store
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ResponsePagination } from "@/types/api/utils.pagination"
import { NotificationDTO } from "@/api/notification/dto";

interface NotificationStore {
  // getall
  list: Array<NotificationDTO>
  pagination: ResponsePagination | null;
  listing: boolean;
  setListState: (data: Partial<{ list: Array<NotificationDTO>, listing: boolean, pagination: ResponsePagination | null }>) => void

  hasNewNotifications: boolean
  setState: (data: Partial<{ hasNewNotifications: boolean }>) => void
}

export const useNotification = create<NotificationStore>((set) => ({
  // getall
  list: [],
  listing: false,
  pagination: null,
  setListState: (data) => set((state) => ({ ...state, ...data })),
  hasNewNotifications: false,
  setState: (data) => set((state) => ({ ...state, ...data })),
}));
