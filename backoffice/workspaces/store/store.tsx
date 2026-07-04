/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { WorkspaceDTO, MemberBackofficeDTO, IntegrationDTO } from "../models/dto";

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

// member

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

// integration

type informationintegrationCreationItemType = {
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  response: any;
  isOpen: boolean;
}

type informationIntegrationUpdateItemType = {
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  response: any;
  isOpen: boolean;
  itemId: string;
  itemData?: IntegrationDTO;
}

type informationInteagrationDeleteItemType = {
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
  response: any;
  isOpen: boolean;
  itemId: string;
}

type IntegrationManagementType = {
  isOpen: boolean;
  workspaceId: string;
}


//

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

  //
  // member
  //

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

  //
  // integration
  //
  
  // create integration
  informationintegrationCreationItem: informationintegrationCreationItemType,
  setInformationintegrationCreationItem: (data: Partial<informationintegrationCreationItemType>) => void;

  // update integration
  informationIntegrationUpdateItem :informationIntegrationUpdateItemType
  setInformationIntegrationUpdateItem: (data: Partial<informationIntegrationUpdateItemType>) => void;

  // delete integration
  informationInteagrationDeleteItem: informationInteagrationDeleteItemType
  setInformationInteagrationDeleteItem: (data: Partial<informationInteagrationDeleteItemType>) => void;

  // manage integrations
  IntegrationManagement: IntegrationManagementType
  setIntegrationManagement: (data: Partial<IntegrationManagementType>) => void;

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

  //
  // integration
  //

  informationintegrationCreationItem: {
    errorMessage: '',
    hasError: false,
    loading: false,
    response: {},
    isOpen: false
  },
  setInformationintegrationCreationItem: (data: Partial<informationintegrationCreationItemType>) => set((state) => {
    return {
      ...state,
      informationintegrationCreationItem: {
        ...state.informationintegrationCreationItem,
        ...data
      }
    }
  }),

  informationIntegrationUpdateItem: {
    errorMessage: '',
    hasError: false,
    loading: false,
    response: {},
    isOpen: false,
    itemId: ''
  },
  setInformationIntegrationUpdateItem: (data: Partial<informationIntegrationUpdateItemType>) => set((state) => {
    return {
      ...state,
      informationIntegrationUpdateItem: {
        ...state.informationIntegrationUpdateItem,
        ...data
      }
    }
  }),

  informationInteagrationDeleteItem: {
    errorMessage: '',
    hasError: false,
    loading: false,
    response: {},
    isOpen: false,
    itemId: ''
  },
  setInformationInteagrationDeleteItem: (data: Partial<informationInteagrationDeleteItemType>) => set((state) => {
    return {
      ...state,
      informationInteagrationDeleteItem: {
        ...state.informationInteagrationDeleteItem,
        ...data
      }
    }
  }),

  IntegrationManagement: {
    isOpen: false,
    workspaceId: ''
  },
  setIntegrationManagement: (data: Partial<IntegrationManagementType>)  => set((state) => {
    return {
      ...state,
      IntegrationManagement: {
        ...state.IntegrationManagement,
        ...data
      }
    }
  }),

}));