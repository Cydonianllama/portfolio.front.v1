/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ResponsePagination } from "@/types/api/utils.pagination";
import { ContactDTO } from "@/api/contacts/contacts.dto";
import { ConversationFilterDTO } from "@/api/conversationFilter/conversation.filter.dto";

interface SettingsStore {
  open: boolean;
  setOpen: (open: boolean) => void;

  // dialogs
  // manageDialogOpen: boolean,
  // creationDialogOpen: boolean,
  // updateDialogOpen: boolean,
  // deleteDialogOpen: boolean,
  // currentItemInAction: ConversationFilterDTO | null,
  // setDialogs: (data: Partial<{ manageDialogOpen: boolean, creationDialogOpen: boolean, updateDialogOpen: boolean, deleteDialogOpen: boolean, currentItemInAction: ConversationFilterDTO | null}>) => void
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  open: false,
  setOpen: (open) => set((state) => ({ ...state, open })),
  // dialogs
  // manageDialogOpen: false,
  // creationDialogOpen: false,
  // updateDialogOpen: false,
  // deleteDialogOpen: false,
  // currentItemInAction: null,
  // setDialogs: (data) => set((state) => ({ ...state, ...data })),
}));