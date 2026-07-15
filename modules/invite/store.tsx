// _____________ store
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ResponsePagination } from "@/types/api/utils.pagination"
import { GetInvitationInformationResponseDTO } from "./service.getinvitationinfo";

type testEntity = { id: string, name: string }

interface InviteStore {
  processingCommand: boolean;
  gettingInfo: boolean;
  invitationInformation: GetInvitationInformationResponseDTO | null
  setInvitation: (data: Partial<{ invitationInformation: GetInvitationInformationResponseDTO | null, gettingInfo: boolean, processingCommand: boolean }>) => void

  currentElementSelected: string | null
  // getall
  list: Array<testEntity>
  pagination: ResponsePagination | null;
  listing: boolean;
  setListState: (data: Partial<{ list: Array<testEntity>, listing: boolean, pagination: ResponsePagination | null }>) => void

}

export const useInvite = create<InviteStore>((set) => ({
  gettingInfo: true,
  processingCommand: false,
  invitationInformation: null,
  setInvitation: (data) => set((state) => ({ ...state, ...data })),

  currentElementSelected: null,
  // getall
  list: [],
  listing: false,
  pagination: null,
  setListState: (data) => set((state) => ({ ...state, ...data })),
}));
