/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { CreateFolder, CreateFolderRequestDTO, DeleteFolder, DeleteFolderRequestDTO, FolderDTO, GetFolder, GetFoldersRequestDTO, UpdateFolder, UpdateFolderRequestDTO } from "@/api/folder/folder.api"
import { TiFolderOpen } from "react-icons/ti"
import { GoPlus } from "react-icons/go"
import { ResponsePagination } from "@/types/api/utils.pagination";
//import { ResponsePagination } from '@/types/api/utils.pagination';

interface FolderStore {
  // state: string | null,
  // setState: (data: Partial<{ state: string | null }>) => void
  // setState2: (state: string) => void

  currentElementSelected: string | null
  pagination: ResponsePagination | null

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
  list: Array<FolderDTO>
  listing: boolean;
  setListState: (data: Partial<{ list: Array<FolderDTO>, listing: boolean, pagination: ResponsePagination | null }>) => void
}

export const useFolderStore = create<FolderStore>((set) => ({
  // state: null,
  // setState: (data) => set((state) => ({ ...state, ...data })),
  // setState2: (data) => set((state) => ({ ...state, state: data })),
  currentElementSelected: null,
  pagination: null,
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