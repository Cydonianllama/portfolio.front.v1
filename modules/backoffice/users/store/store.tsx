/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { UserDTO } from "../models/dto";

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
  itemData?: UserDTO
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

type informationUserActionItemType = {
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  response: any;
  isOpen: boolean;
  itemId: string;
  itemData?: UserDTO
}

interface Managerv1Store {
  // information creation
  informationCreationItem: informationCreationItemType
  setInformationCreationItem: (data: Partial<informationCreationItemType>) => void;
  // information update
  informationIpdateItem: informationUpdateItemType
  setInformationUpdateItem: (data: Partial<informationUpdateItemType>) => void;
  // information delete
  informationDeleteItem: informationDeleteItemType
  setInformationDeleteItem: (data: Partial<informationDeleteItemType>) => void;
  informationStatusItem: informationUserActionItemType
  setInformationStatusItem: (data: Partial<informationUserActionItemType>) => void;
  informationWorkspacesItem: informationUserActionItemType
  setInformationWorkspacesItem: (data: Partial<informationUserActionItemType>) => void;
  informationPasswordItem: informationUserActionItemType
  setInformationPasswordItem: (data: Partial<informationUserActionItemType>) => void;
  informationInternalRolItem: informationUserActionItemType
  setInformationInternalRolItem: (data: Partial<informationUserActionItemType>) => void;
  // selection
  itemsSelected: Array<string>,
  setItemsSelected: (data: Array<string>) => void;
}

export const useManagerv1Store = create<Managerv1Store>((set) => ({
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
  informationStatusItem: {
    errorMessage: '',
    hasError: false,
    loading: false,
    response: {},
    isOpen: false,
    itemId: ''
  },
  setInformationStatusItem: (data: Partial<informationUserActionItemType>) => set((state) => {
    return {
      ...state,
      informationStatusItem: {
        ...state.informationStatusItem,
        ...data
      }
    }
  }),
  informationWorkspacesItem: {
    errorMessage: '',
    hasError: false,
    loading: false,
    response: {},
    isOpen: false,
    itemId: ''
  },
  setInformationWorkspacesItem: (data: Partial<informationUserActionItemType>) => set((state) => {
    return {
      ...state,
      informationWorkspacesItem: {
        ...state.informationWorkspacesItem,
        ...data
      }
    }
  }),
  informationPasswordItem: {
    errorMessage: '',
    hasError: false,
    loading: false,
    response: {},
    isOpen: false,
    itemId: ''
  },
  setInformationPasswordItem: (data: Partial<informationUserActionItemType>) => set((state) => {
    return {
      ...state,
      informationPasswordItem: {
        ...state.informationPasswordItem,
        ...data
      }
    }
  }),
  informationInternalRolItem: {
    errorMessage: '',
    hasError: false,
    loading: false,
    response: {},
    isOpen: false,
    itemId: ''
  },
  setInformationInternalRolItem: (data: Partial<informationUserActionItemType>) => set((state) => {
    return {
      ...state,
      informationInternalRolItem: {
        ...state.informationInternalRolItem,
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
