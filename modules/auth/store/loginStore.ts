import { create } from "zustand";

interface LoginStore {
  open: boolean;
  processing: boolean;
  setState: (data: Partial<{ open: boolean, processing: boolean }>) => void
}

export const useLogin = create<LoginStore>((set) => ({
  open: false,
  processing: false,
  setState: (data) => set((state) => ({ ...state, ...data })),
}));
