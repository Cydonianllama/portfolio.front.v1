// _____________ store
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ResponsePagination } from "@/types/api/utils.pagination"

type testEntity = { id: string, name: string }

interface OnboardingStore {
  currentElementSelected: string | null

  // getall
  list: Array<testEntity>
  pagination: ResponsePagination | null;
  listing: boolean;
  setListState: (data: Partial<{ list: Array<testEntity>, listing: boolean, pagination: ResponsePagination | null }>) => void

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

  // steps
  step: number,
  setStep: (data: Partial<{ step: number }>) => void;
  // step
  nameWorkspace: string;
  rol: string
  industry: string
  qtyTeam: string
  // step 1
  setStep1: (data: Partial<{ nameWorkspace: string }>) => void
  // step 2
  setStep2: (data: Partial<{ rol: string, industry: string, qtyTeam: string }>) => void
}

export const useOnboarding = create<OnboardingStore>((set) => ({
  currentElementSelected: null,

  // getall
  list: [],
  listing: false,
  pagination: null,
  setListState: (data) => set((state) => ({ ...state, ...data })),

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

  // steps
  step: 1,
  setStep: (data) => set((state) => ({ ...state, ...data })),

  // step1
  nameWorkspace: '',
  rol: '',
  industry: '',
  qtyTeam: '',
  setStep1: (data) => set((state) => ({ ...state, ...data })),
  setStep2: (data) => set((state) => ({ ...state, ...data })),
}));
