// _____________ store
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ResponsePagination } from "@/types/api/utils.pagination"
import { MessageDTO, RoomDTO } from "@/api/chat/chat.dto";

interface AutomationTestStore {
  openChat: boolean
  contactOpenedId?: string | null
  setState: (data: Partial<{ openChat: boolean, contactOpenedId: string | null }>) => void

  // currentElementSelected: string | null

  // // getall
  list: Array<RoomDTO>
  pagination: ResponsePagination | null;
  listing: boolean;
  setListState: (data: Partial<{ list: Array<RoomDTO>, listing: boolean, pagination: ResponsePagination | null }>) => void

  // send
  sending: boolean,
  setSend: (data: Partial<{ sending: boolean }>) => void

  // // messages
  listMessages: Array<MessageDTO>
  paginationMessages: ResponsePagination | null;
  listingMessages: boolean;
  setListStateMessages: (data: Partial<{ listMessages: Array<MessageDTO>, listingMessages: boolean, paginationMessages: ResponsePagination | null }>) => void

  // // create
  openCreate: boolean;
  creating: boolean;
  setCreateState: (data: Partial<{ openCreate: boolean, creating: boolean, currentElementSelected: string | null }>) => void

  // // update
  // openUpdate: boolean;
  // updating: boolean;
  // setUpdateState: (data: Partial<{ openUpdate: boolean, updating: boolean, currentElementSelected: string | null }>) => void

  // // delete
  openDelete: boolean;
  deleting: boolean;
  setDeleteState: (data: Partial<{ openDelete: boolean, deleting: boolean, currentElementSelected: string | null }>) => void

}

export const useAutomationTest = create<AutomationTestStore>((set) => ({
  openChat: false,
  setState: (data) => set((state) => ({ ...state, ...data })),
  // currentElementSelected: null,

  // send
  sending: false,
  setSend: (data) => set((state) => ({ ...state, ...data })),

  // // getall
  list: [],
  listing: false,
  pagination: null,
  setListState: (data) => set((state) => ({ ...state, ...data })),

  // // getall messages
  listMessages: [],
  listingMessages: false,
  paginationMessages: null,
  setListStateMessages: (data) => set((state) => ({ ...state, ...data })),


  // //create
  openCreate: false,
  creating: false,
  setCreateState: (data) => set((state) => ({ ...state, ...data })),

  // //update
  // openUpdate: false,
  // updating: false,
  // setUpdateState: (data) => set((state) => ({ ...state, ...data })),

  // //delete
  openDelete: false,
  deleting: false,
  setDeleteState: (data) => set((state) => ({ ...state, ...data })),
}));
