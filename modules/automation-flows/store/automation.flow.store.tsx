/* eslint-disable @typescript-eslint/no-empty-object-type */
// _____________ store
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ResponsePagination } from "@/types/api/utils.pagination"

type testEntity = { id: string, name: string }

interface AutomationFlowStore {
  currentNodeIdEditing: string | null
  openEdit: boolean
  setStartEdit: (data: Partial<{ currentNodeIdEditing: string, openEdit: boolean }>) => void
  clearEdit: () => void

  // currentElementSelected: string | null

  // // getall
  // list: Array<testEntity>
  // pagination: ResponsePagination | null;
  // listing: boolean;
  // setListState: (data: Partial<{ list: Array<testEntity>, listing: boolean, pagination: ResponsePagination | null }>) => void

  // // create
  // openCreate: boolean;
  // creating: boolean;
  // setCreateState: (data: Partial<{ openCreate: boolean, creating: boolean, currentElementSelected: string | null }>) => void

  // // update
  // openUpdate: boolean;
  // updating: boolean;
  // setUpdateState: (data: Partial<{ openUpdate: boolean, updating: boolean, currentElementSelected: string | null }>) => void

  // // delete
  // openDelete: boolean;
  // deleting: boolean;
  // setDeleteState: (data: Partial<{ openDelete: boolean, deleting: boolean, currentElementSelected: string | null }>) => void

}

export const useAutomationFlow = create<AutomationFlowStore>((set) => ({
  currentNodeIdEditing: null,
  openEdit: false,
  setStartEdit: (data) => set((state) => ({ ...state, ...data })),
  clearEdit: () => set((state) => ({ ...state, openEdit: false, currentNodeIdEditing: null })),
  
  // currentElementSelected: null,

  // // getall
  // list: [],
  // listing: false,
  // pagination: null,
  // setListState: (data) => set((state) => ({ ...state, ...data })),

  // //create
  // openCreate: false,
  // creating: false,
  // setCreateState: (data) => set((state) => ({ ...state, ...data })),

  // //update
  // openUpdate: false,
  // updating: false,
  // setUpdateState: (data) => set((state) => ({ ...state, ...data })),

  // //delete
  // openDelete: false,
  // deleting: false,
  // setDeleteState: (data) => set((state) => ({ ...state, ...data })),
}));
