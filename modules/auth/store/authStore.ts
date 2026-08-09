/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { UserDTO } from "@/api/user/user.dto";

interface AuthStore {
  token: string | null;
  basicUserInformation: UserDTO,
  setToken: (token: string | null) => void;
  setBasicUserInformation: (data: { email: string; fullname: string; id: string }) => void;

  proccesingRegister: boolean;
  setState: (data: Partial<{ proccesingRegister: boolean }>) => void;
}

export const useAuthCydoStore = create<AuthStore>((set) => ({
  token: null,
  basicUserInformation: { email: '', fullname: '', id: '', isOnboardingFinished: false, isVerified: false },
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
  proccesingRegister: false,
  setState: (data) => set(state => ({...state, ...data}))
}));
