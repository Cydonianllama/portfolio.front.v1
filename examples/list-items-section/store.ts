/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ResponsePagination } from "@/types/api/utils.pagination";
import { ItemDTO } from "./dto";


type informationDeleteItemType = {
  // states of operation
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  response: any;
  isOpen: boolean;
  itemId: string | null;
  itemData: ItemDTO | null;
}

type informationUpdateItemType = {
  // states of operation
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  response: any;
  isOpen: boolean;
  itemId: string | null;
  itemData: ItemDTO | null;
}

type informationCreateItemType = {
  // states of operation
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  response: any;
  isOpen: boolean;
}

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
  //
  //
  //

  //
  //
  // information creation
  informationListItem: informationListItemType
  setinformationListItem: (data: Partial<informationListItemType>) => void;
  //  creation
  informationCreationItem: informationCreateItemType
  setinformationCreationItem: (data: Partial<informationCreateItemType>) => void;
  //  update
  informationUpdateItem: informationUpdateItemType
  setinformationUpdateItem: (data: Partial<informationUpdateItemType>) => void;
  //  delete
  informationDeleteItem: informationDeleteItemType
  setinformationDeleteItem: (data: Partial<informationDeleteItemType>) => void;
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
  informationCreationItem: {
    errorMessage: '',
    hasError: false,
    isOpen: false,
    loading: false,
    response: null
  },
  setinformationCreationItem:  (data: Partial<informationCreateItemType>) => set((state) => {
    return {
      ...state,
      informationCreationItem: {
        ...state.informationCreationItem,
        ...data
      }
    }
  }),
  //
  informationUpdateItem: {
    errorMessage: '',
    hasError: false,
    isOpen: false,
    itemData: null,
    itemId: null,
    loading: false,
    response: null
  },
  setinformationUpdateItem: (data: Partial<informationUpdateItemType>) => set((state) => {
    return {
      ...state,
      informationUpdateItem: {
        ...state.informationUpdateItem,
        ...data
      }
    }
  }),
  //
  informationDeleteItem: {
    errorMessage: '',
    hasError: false,
    isOpen: false,
    itemData: null,
    itemId: null,
    loading: false,
    response: null
  },
  setinformationDeleteItem: (data: Partial<informationDeleteItemType>) => set((state) => {
    return {
      ...state,
      informationDeleteItem: {
        ...state.informationDeleteItem,
        ...data
      }
    }
  }),

}));