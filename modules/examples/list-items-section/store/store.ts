/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ItemDTO } from "../models/model";
import { ResponsePagination } from "@/types/utils.pagination";

type informationListItemType = {
  // states of operation
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  response: any;
  isOpen: boolean
  list: Array<ItemDTO>
  pagination?: ResponsePagination | null
}

interface Managerv1Store {
  // information creation
  informationListItem: informationListItemType
  setinformationListItem: (data: Partial<informationListItemType>) => void;
}

export const useManagerv1Store = create<Managerv1Store>((set) => ({
  // information creation
  informationListItem: {
    errorMessage: '',
    hasError: false,
    loading: false,
    response: {},
    isOpen: false,
    list: []
  },
  setinformationListItem: (data: Partial<informationListItemType>) => set((state) => {
    return {
      ...state,
      informationListItem: {
        ...state.informationListItem,
        ...data
      }
    }
  }),

}));