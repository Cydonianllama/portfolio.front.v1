/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ResponsePagination } from "@/types/api/utils.pagination";
import { ContactDTO } from "@/api/contacts/contacts.dto";
import { ConversationFilterDTO } from "@/api/conversationFilter/conversation.filter.dto";

interface ConversationFiltersStore {
  // dialogs
  manageDialogOpen: boolean,
  creationDialogOpen: boolean,
  updateDialogOpen: boolean,
  deleteDialogOpen: boolean,
  currentItemInAction: ConversationFilterDTO | null,
  setDialogs: (data: Partial<{ manageDialogOpen: boolean, creationDialogOpen: boolean, updateDialogOpen: boolean, deleteDialogOpen: boolean, currentItemInAction: ConversationFilterDTO | null}>) => void

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
  updating: boolean,
  isErrorUpdating: boolean,
  errorUpdating: string,
  successUpdating: boolean,
  setUpdate: (data: Partial<{ updating: boolean, isErrorUpdating: boolean, errorUpdating: string, successUpdating: boolean}>) => void


  // delete 
  deleting: boolean,
  isErrorDeleting: boolean,
  errorDeleting: string,
  successDeleting: boolean,
  setDelete: (data: Partial<{ deleting: boolean, isErrorDeleting: boolean, errorDeleting: string, successDeleting: boolean }>) => void;
}

export const useCoversationFiltersStore = create<ConversationFiltersStore>((set) => ({
  // dialogs
  manageDialogOpen: false,
  creationDialogOpen: false,
  updateDialogOpen: false,
  deleteDialogOpen: false,
  currentItemInAction: null,
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
  setCreation: (data) => set((state) => ({ ...state, ...data })),

  // update
  updating: false,
  isErrorUpdating: false,
  errorUpdating: '',
  successUpdating: false,
  setUpdate: (data) => set((state) => ({ ...state, ...data })),

  // delete
  deleting: false,
  isErrorDeleting: false,
  errorDeleting: '',
  successDeleting: false,
  setDelete: (data) => set((state) => ({ ...state, ...data })),
}));