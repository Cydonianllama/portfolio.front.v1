// _____________ store
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ResponsePagination } from "@/types/api/utils.pagination"
import { RoomDTO } from "@/api/chat/chat.dto";

interface WatchConversationsStore {
  contactOpened: string | null;
  open: boolean;
  setGeneral: (data: Partial<{ open: boolean, contactOpened: string | null }>) => void

  // currentElementSelected: string | null

  // // getall
  list: Array<RoomDTO>
  pagination: ResponsePagination | null;
  listing: boolean;
  setListState: (data: Partial<{ list: Array<RoomDTO>, listing: boolean, pagination: ResponsePagination | null }>) => void
  
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

export const useWatchConversations = create<WatchConversationsStore>((set) => ({
  open: false,
  contactOpened: null,
  setGeneral: (data) => set((state) => ({ ...state, ...data })),

  // currentElementSelected: null,

  // // getall
  list: [],
  listing: false,
  pagination: null,
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
