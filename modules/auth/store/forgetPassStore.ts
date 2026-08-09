import { create } from "zustand";
interface ForgetPassStore {
  code: string;
  changing: boolean;
  setState: (data: Partial<{ code: string, changing: boolean }>) => void
}

export const useForgetPass = create<ForgetPassStore>((set) => ({
  code: '',
  changing: false,
  setState: (data) => set((state) => ({ ...state, ...data })),
}));
