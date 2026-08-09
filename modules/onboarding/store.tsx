// _____________ store
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface OnboardingStore {
  // steps
  step: number,
  finalizing: boolean,
  setStep: (data: Partial<{ step: number, finalizing: boolean }>) => void;
  // step
  nameWorkspace: string;
  rol: string
  industry: string
  qtyTeam: string
  // step 1
  setStep1: (data: Partial<{ nameWorkspace: string }>) => void
  // step 2
  setStep2: (data: Partial<{ rol: string, industry: string, qtyTeam: string }>) => void
}

export const useOnboarding = create<OnboardingStore>((set) => ({
  // steps
  step: 1,
  finalizing: false,
  setStep: (data) => set((state) => ({ ...state, ...data })),

  // step1
  nameWorkspace: '',
  rol: '',
  industry: '',
  qtyTeam: '',
  setStep1: (data) => set((state) => ({ ...state, ...data })),
  setStep2: (data) => set((state) => ({ ...state, ...data })),
}));
