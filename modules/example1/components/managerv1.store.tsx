import { create } from "zustand";

interface Managerv1Store {
  // dialog creation
  isOpenCreateItem: boolean;
  setOpenCreateItem: (isOpen: boolean) => void;
  // dialog edit
  isOpenUpdateItem: boolean;
  setOpenUpdateItem: (isOpen: boolean) => void;
  // dialog confirm elimination
  isOpenDeleteItem: boolean;
  setOpenDeleteItem: (isOpen: boolean) => void;
}

export const useManagerv1Store = create<Managerv1Store>((set) => ({
  // dialog creation
  isOpenCreateItem: false,
  setOpenCreateItem: (isOpen: boolean) => set({ isOpenCreateItem: isOpen }),
  // dialog edit
  isOpenUpdateItem: false,
  setOpenUpdateItem: (isOpen: boolean) => set({ isOpenCreateItem: isOpen }),
  // dialog confirm elimination
  isOpenDeleteItem: false,
  setOpenDeleteItem: (isOpen: boolean) => set({ isOpenCreateItem: isOpen }),
}));