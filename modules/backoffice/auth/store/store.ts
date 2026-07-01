/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface AuthStore {
  token: string | null;
  basicUserInformation: {
    email: string;
    fullname: string;
    id: string;
  }
  setToken: (token: string | null) => void;
  setBasicUserInformation: (data: { email: string; fullname: string; id: string }) => void;

}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  basicUserInformation: {
    email: '',
    fullname: '',
    id: ''
  },
  setToken: (token: string | null) => set((state) => ({
    ...state,
    token
  })),
  setBasicUserInformation: (data: { email: string; fullname: string; id: string }) => set((state) => ({
    ...state,
    basicUserInformation: {
      ...state.basicUserInformation,
      ...data
    }
  })),
}));
