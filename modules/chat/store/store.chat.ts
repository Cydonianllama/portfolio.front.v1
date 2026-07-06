/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ResponsePagination } from "@/types/api/utils.pagination";
import { MessageDTO, RoomDTO } from "@/api/chat/chat.dto";

interface ChatStore {

  // chats
  loadingChats: boolean
  errorListMessage: string;
  isError: boolean;
  page: number;
  listChats: Array<RoomDTO>,
  setChats: (chats: Array<RoomDTO>) => void,
  setStates: (data: Partial<{ loadingChats: boolean, errorListMessage: string, isError: boolean, page: number }>) => void
  resetAll: () => void;

  // sending message
  sendingMessage: boolean;
  successSendingMessage: boolean;
  setSendingMessageState: (data: Partial<{ sendingMessage: boolean, successSendingMessage: boolean }>) => void;

  // listing messages
  listingMessages: boolean;
  successListingMessages: boolean;
  setListingMessageStates: (data: Partial<{ listingMessages: boolean, successListingMessages: boolean }>) => void;

  // chat selected
  roomIdOpened: string | null,
  openingChat: boolean,
  hasSuccessOpeningChat: boolean,
  messages: Array<MessageDTO>
  paginationMessages: ResponsePagination | null,
  setChatSelectedStates: (data: Partial<{ roomIdOpened: string | null, openingChat: boolean, hasSuccessOpeningChat: boolean, messages: Array<MessageDTO>, paginationMessages: ResponsePagination | null }>) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  listChats: [],
  errorListMessage: '',
  isError: false,
  loadingChats: false,
  page: 1,
  setChats: (data) => set((state) => ({ listChats: data })),
  setStates: (data) => set((state) => {
    return {
      ...state,
      ...data
    }
  }),
  resetAll: () => set((state) => ({
    ...state,
    errorListMessage: '',
    isError: false,
    listChats: [],
    loadingChats: false,
    page: 1
  })),

  // chat selected
  hasSuccessOpeningChat: false,
  messages: [],
  openingChat: false,
  roomIdOpened: null,
  paginationMessages: null,
  setChatSelectedStates: (data) => set((state) => {
    return {
      ...state,
      ...data
    }
  }),

  // message states
  sendingMessage: false,
  successSendingMessage: false,
  setSendingMessageState: (data) => set((state) => {
    return {
      ...state,
      ...data
    }
  }),

  // listing messages
  listingMessages: false,
  successListingMessages: false,
  setListingMessageStates: (data) => set((state) => {
    return {
      ...state,
      ...data
    }
  }),
}));