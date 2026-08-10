/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { WidgetDTO } from "../models/dto";

type informationCreationItemType = {
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  response: any;
  isOpen: boolean
}

type informationUpdateItemType = {
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  response: any;
  isOpen: boolean;
  itemId: string;
  itemData?: WidgetDTO
}

type informationDeleteItemType = {
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  response: any;
  isOpen: boolean;
  itemId: string;
}

interface WidgetStore {
  informationCreationItem: informationCreationItemType
  setInformationCreationItem: (data: Partial<informationCreationItemType>) => void;
  informationUpdateItem: informationUpdateItemType
  setInformationUpdateItem: (data: Partial<informationUpdateItemType>) => void;
  informationDeleteItem: informationDeleteItemType
  setInformationDeleteItem: (data: Partial<informationDeleteItemType>) => void;
}

export const useWidgetStore = create<WidgetStore>((set) => ({
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
  informationUpdateItem: {
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
      informationUpdateItem: {
        ...state.informationUpdateItem,
        ...data
      }
    }
  }),
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
}));
