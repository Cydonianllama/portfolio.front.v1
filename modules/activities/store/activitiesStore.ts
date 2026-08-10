import { create } from "zustand";
import { ResponsePagination } from "@/types/api/utils.pagination"
import { ActivityDTO, ActivityEntityType } from "@/api/activity/dto";
interface ActivitiesStore {
  // getall
  list: Array<ActivityDTO>
  pagination: ResponsePagination | null;
  listing: boolean;
  setListState: (data: Partial<{ list: Array<ActivityDTO>, listing: boolean, pagination: ResponsePagination | null }>) => void
  // filters
  entityFilter: ActivityEntityType | 'all',
  setEntityFilter: (data: ActivityEntityType | 'all') => void
}

export const useActivities = create<ActivitiesStore>((set) => ({
  // getall
  list: [],
  listing: false,
  pagination: null,
  setListState: (data) => set((state) => ({ ...state, ...data })),
  // filters
  entityFilter: 'all',
  setEntityFilter: (data) => set((state) => ({ ...state, entityFilter: data })),
}));
