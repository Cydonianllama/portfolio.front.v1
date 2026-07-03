/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ChatDTO, MessageDTO } from "../dtos/dtos";

interface ChatStore {

  // chats
  loadingChats: boolean
  errorListMessage: string;
  isError: boolean;
  page: number;
  listChats: Array<ChatDTO>,
  setChats: (chats: Array<ChatDTO>) => void,
  setStates: (data: Partial<{ loadingChats: boolean, errorListMessage: string, isError: boolean, page: number }>) => void
  resetAll: () => void;

  // chat selected
  roomIdOpened: string | null,
  openingChat: boolean,
  hasErrorOpeningChat: boolean,
  messages: Array<MessageDTO>
  setChatSelectedStates: (data: Partial<{ roomIdOpened: string | null, openingChat: boolean, hasErrorOpeningChat: boolean, messages: Array<MessageDTO> }>) => void;
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
  hasErrorOpeningChat: false,
  messages: [],
  openingChat: false,
  roomIdOpened: null,
  setChatSelectedStates: (data) => set((state) => {
    return {
      ...state,
      ...data
    }
  }),
}));