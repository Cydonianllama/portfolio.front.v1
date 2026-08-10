/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ResponsePagination } from "@/types/api/utils.pagination";
import { TagDTO } from "@/api/tags/tags.dto";
//import { ResponsePagination } from '@/types/api/utils.pagination';

interface TagStore {

  currentElementSelected: string | null
  pagination: ResponsePagination | null

  // search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // create
  openCreate: boolean;
  creating: boolean;
  setCreateState: (data: Partial<{ openCreate: boolean, creating: boolean, currentElementSelected: string | null }>) => void
  // update
  openUpdate: boolean;
  updating: boolean;
  setUpdateState: (data: Partial<{ openUpdate: boolean, updating: boolean, currentElementSelected: string | null }>) => void

  // delete
  openDelete: boolean;
  deleting: boolean;
  setDeleteState: (data: Partial<{ openDelete: boolean, deleting: boolean, currentElementSelected: string | null }>) => void

  // getall
  list: Array<TagDTO>
  listing: boolean;
  setListState: (data: Partial<{ list: Array<TagDTO>, listing: boolean, pagination: ResponsePagination | null }>) => void
}

export const useTagStore = create<TagStore>((set) => ({
  currentElementSelected: null,
  pagination: null,
  //search
  searchQuery: '',
  setSearchQuery: (query) => set((state) => ({ ...state, searchQuery: query })),
  //create
  openCreate: false,
  creating: false,
  setCreateState: (data) => set((state) => ({ ...state, ...data })),
  //update
  openUpdate: false,
  updating: false,
  setUpdateState: (data) => set((state) => ({ ...state, ...data })),
  //delete
  openDelete: false,
  deleting: false,
  setDeleteState: (data) => set((state) => ({ ...state, ...data })),

  // getall
  list: [],
  listing: false,
  setListState: (data) => set((state) => ({ ...state, ...data }))
}));
// #endregion Store
