/* eslint-disable @typescript-eslint/no-empty-object-type */
// _____________ store
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ResponsePagination } from "@/types/api/utils.pagination"
import { InformationAutomationFlow } from "@/api/flow/dto";


interface AutomationFlowStore {
  currentNodeIdEditing: string | null
  openEdit: boolean
  setStartEdit: (data: Partial<{ currentNodeIdEditing: string, openEdit: boolean }>) => void
  clearEdit: () => void

  automationId: string | null
  setAutomationId: (data: Partial<{ automationId: string | null }>) => void

  openTriggerSelector: boolean,
  setTriggerSelector: (data: Partial<{ openTriggerSelector: boolean }>) => void

  // currentElementSelected: string | null

  // // getall
  information: InformationAutomationFlow | null
  listing: boolean;
  setListState: (data: Partial<{ information: InformationAutomationFlow, listing: boolean, pagination: ResponsePagination | null }>) => void

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

  automationId: null,
  setAutomationId: (data) => set((state) => ({ ...state, ...data })),

  openTriggerSelector: false,
  setTriggerSelector: (data) => set((state) => ({ ...state, ...data })),
  
  // currentElementSelected: null,

  // // getall
  information: null,
  listing: false,
  setListState: (data) => set((state) => ({ ...state, ...data })),

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
