/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ResponsePagination } from "@/types/api/utils.pagination";
import { ContactDTO } from "@/api/contacts/contacts.dto";
import { ConversationFilterDTO } from "@/api/conversationFilter/conversation.filter.dto";

interface ConversationFiltersStore {
  // dialogs
  manageDialogOpen: boolean,
  creationDialogOpen: boolean,
  setDialogs: (data: Partial<{ manageDialogOpen: boolean, creationDialogOpen: boolean }>) => void

  // pagination list
  loadingFilters: boolean
  errorList: string;
  isError: boolean;
  listConvesationFilters: Array<ConversationFilterDTO>,
  paginationFilters: ResponsePagination | null,
  setStates: (data: Partial<{ loadingFilters: boolean, errorList: string, isError: boolean, listConvesationFilters: Array<ConversationFilterDTO>, paginationFilters: ResponsePagination | null }>) => void,

  // creation
  creatingFilter: boolean;
  isErrorCreatingFilter: boolean;
  errorCreatingFilter: string;
  successCreation: boolean;
  setCreation: (data: Partial<{ creatingFilter: boolean, isErrorCreatingFilter: boolean, errorCreatingFilter: string, successCreation: boolean }>) => void;
  // update

  // delete 
}

export const useCoversationFiltersStore = create<ConversationFiltersStore>((set) => ({
  // dialogs
  manageDialogOpen: false,
  creationDialogOpen: false,
  setDialogs: (data) => set((state) => ({ ...state, ...data })),

  // list
  loadingFilters: false,
  errorList: '',
  isError: false,
  listConvesationFilters: [],
  paginationFilters: null,
  setStates: (data) => set((state) => ({ ...state, ...data })),

  // creation
  creatingFilter: false,
  errorCreatingFilter: '',
  isErrorCreatingFilter: false,
  successCreation: false,
  setCreation: (data) => set((state) => ({ ...state, ...data }))
}));