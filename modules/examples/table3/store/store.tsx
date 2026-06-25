/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ManagerV1Item } from "../models/dto";
import { tabsAvailables } from "../config";

type informationCreationItemType = {
  // states of operation
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  response: any;
  isOpen: boolean
}

type informationUpdateItemType = {
  // states of operation
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  response: any;
  isOpen: boolean;
  itemId: string;
  itemData?: ManagerV1Item
}

type informationDeleteItemType = {
  // states of operation
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  response: any;
  isOpen: boolean;
  itemId: string;
}

interface Managerv1Store {
  tab: tabsAvailables,
  setTab: (data: tabsAvailables) => void;
  // information creation
  informationCreationItem: informationCreationItemType
  setInformationCreationItem: (data: Partial<informationCreationItemType>) => void;
  // information update
  informationIpdateItem: informationUpdateItemType
  setInformationUpdateItem: (data: Partial<informationUpdateItemType>) => void;
  // information delete
  informationDeleteItem: informationDeleteItemType
  setInformationDeleteItem: (data: Partial<informationDeleteItemType>) => void;
  // selection
  itemsSelected: Array<string>,
  setItemsSelected: (data: Array<string>) => void;
}

export const useManagerv1Store = create<Managerv1Store>((set) => ({
  tab: 'Active',
  setTab: (data: tabsAvailables) => set({
    tab: data
  }),
  // information creation
  informationCreationItem: {
    errorMessage: '',
    hasError: false,
    loading: false,
    response: {},
    isOpen: false
  },
  setInformationCreationItem: (data: Partial<informationCreationItemType>) => set((state) => {
    return {
      ...state,
      informationCreationItem: {
        ...state.informationCreationItem,
        ...data
      }
    }
  }),
  // information update
  informationIpdateItem: {
    errorMessage: '',
    hasError: false,
    loading: false,
    response: {},
    isOpen: false,
    itemId: ''
  },
  setInformationUpdateItem: (data: Partial<informationUpdateItemType>) => set((state) => {
    return {
      ...state,
      informationIpdateItem: {
        ...state.informationIpdateItem,
        ...data
      }
    }
  }),
  // information delete
  informationDeleteItem: {
    errorMessage: '',
    hasError: false,
    loading: false,
    response: {},
    isOpen: false,
    itemId: ''
  },
  setInformationDeleteItem: (data: Partial<informationDeleteItemType>) => set((state) => {
    return {
      ...state,
      informationDeleteItem: {
        ...state.informationDeleteItem,
        ...data
      }
    }
  }),
  // selection
  itemsSelected: [],
  setItemsSelected: (data: Array<string>) => set((state) => {
    return {
      ...state,
      itemsSelected: data
    }
  })
}));