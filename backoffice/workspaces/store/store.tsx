/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { WorkspaceDTO, MemberBackofficeDTO } from "../models/dto";

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
  itemData?: WorkspaceDTO
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

type informationMemberCreationItemType = {
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  response: any;
  isOpen: boolean;
}

type informationMemberUpdateItemType = {
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  response: any;
  isOpen: boolean;
  itemId: string;
  itemData?: MemberBackofficeDTO;
}

type informationMemberDeleteItemType = {
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  response: any;
  isOpen: boolean;
  itemId: string;
}

type memberManagementType = {
  isOpen: boolean;
  workspaceId: string;
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
  // selection
  itemsSelected: Array<string>,
  setItemsSelected: (data: Array<string>) => void;

  // member management dialog
  memberManagement: memberManagementType
  setMemberManagement: (data: Partial<memberManagementType>) => void;

  // member creation dialog
  informationMemberCreationItem: informationMemberCreationItemType
  setInformationMemberCreationItem: (data: Partial<informationMemberCreationItemType>) => void;

  // member update dialog
  informationMemberUpdateItem: informationMemberUpdateItemType
  setInformationMemberUpdateItem: (data: Partial<informationMemberUpdateItemType>) => void;

  // member delete dialog
  informationMemberDeleteItem: informationMemberDeleteItemType
  setInformationMemberDeleteItem: (data: Partial<informationMemberDeleteItemType>) => void;
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
  // selection
  itemsSelected: [],
  setItemsSelected: (data: Array<string>) => set((state) => {
    return {
      ...state,
      itemsSelected: data
    }
  }),

  // member management
  memberManagement: {
    isOpen: false,
    workspaceId: ''
  },
  setMemberManagement: (data: Partial<memberManagementType>) => set((state) => {
    return {
      ...state,
      memberManagement: {
        ...state.memberManagement,
        ...data
      }
    }
  }),

  // member creation
  informationMemberCreationItem: {
    errorMessage: '',
    hasError: false,
    loading: false,
    response: {},
    isOpen: false
  },
  setInformationMemberCreationItem: (data: Partial<informationMemberCreationItemType>) => set((state) => {
    return {
      ...state,
      informationMemberCreationItem: {
        ...state.informationMemberCreationItem,
        ...data
      }
    }
  }),

  // member update
  informationMemberUpdateItem: {
    errorMessage: '',
    hasError: false,
    loading: false,
    response: {},
    isOpen: false,
    itemId: ''
  },
  setInformationMemberUpdateItem: (data: Partial<informationMemberUpdateItemType>) => set((state) => {
    return {
      ...state,
      informationMemberUpdateItem: {
        ...state.informationMemberUpdateItem,
        ...data
      }
    }
  }),

  // member delete
  informationMemberDeleteItem: {
    errorMessage: '',
    hasError: false,
    loading: false,
    response: {},
    isOpen: false,
    itemId: ''
  },
  setInformationMemberDeleteItem: (data: Partial<informationMemberDeleteItemType>) => set((state) => {
    return {
      ...state,
      informationMemberDeleteItem: {
        ...state.informationMemberDeleteItem,
        ...data
      }
    }
  }),
}));