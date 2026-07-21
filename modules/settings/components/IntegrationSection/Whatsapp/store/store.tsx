// _____________ store
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { IntegrationDTO } from "@/api/integration/integration.dto";
import { ResponsePagination } from "@/types/api/utils.pagination";

interface WhatsappIntegrationuseWhatsappIntegrationStore {
  list: Array<IntegrationDTO>;
  pagination: ResponsePagination | null;
  listing: boolean;
  setList: (data: Partial<{ list: Array<IntegrationDTO>, listing: boolean, pagination: ResponsePagination | null }>) => void;

  openManage: boolean;
  setOpenManage: (data: Partial<{ openManage: boolean }>) => void

  // delete
  openDelete: boolean;
  deleting: boolean;
  setDeleteState: (data: Partial<{ openDelete: boolean, deleting: boolean, currentElementSelected: string | null }>) => void
}

export const useWhatsappIntegration = create<WhatsappIntegrationuseWhatsappIntegrationStore>((set) => ({
  list: [],
  listing: false,
  pagination: null,
  setList: (data) => set((state) => ({ ...state, ...data })),

  openManage: false,
  setOpenManage: (data) => set((state) => ({ ...state, ...data })),

  // delete
  openDelete: false,
  deleting: false,
  setDeleteState: (data) => set((state) => ({ ...state, ...data })),
  

}));
