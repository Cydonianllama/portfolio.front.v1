/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface DashboarManagementStore {
  test: any;
  settest: (user: any) => void;
}

export const useUserStore = create<DashboarManagementStore>((set) => ({
  test: null,

  settest: () =>
    set({
      test: null
    })
}));