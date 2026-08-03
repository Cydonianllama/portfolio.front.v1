/* eslint-disable @typescript-eslint/no-empty-object-type */
// _____________ store
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ResponsePagination } from "@/types/api/utils.pagination"
import { InformationAutomationFlow } from "@/api/flow/dto";
import { TriggerDTO } from "@/api/flow/trigger.dto";

export type modeAutomationFlow = 'preview' | 'editor'

interface AutomationFlowStore {
  currentNodeIdEditing: string | null
  openEdit: boolean
  setStartEdit: (data: Partial<{ currentNodeIdEditing: string, openEdit: boolean }>) => void
  clearEdit: () => void

  automationId: string | null
  setAutomationId: (data: Partial<{ automationId: string | null }>) => void

  openTriggerSelector: boolean,
  setTriggerSelector: (data: Partial<{ openTriggerSelector: boolean }>) => void

  openSelectNode: boolean
  setSelectNode: (data: Partial<{ openSelectNode: boolean }>) => void

  openRequestServiceEditor: boolean
  setRequestServiceEditor: (data: Partial<{ openRequestServiceEditor: boolean }>) => void

  // // getall
  triggersFromtAutomation: Array<TriggerDTO>,
  setTriggersFromAutomation: (data: Array<TriggerDTO>) => void
  information: InformationAutomationFlow | null
  listing: boolean;
  initialListFinished: boolean
  setListState: (data: Partial<{ information: InformationAutomationFlow, listing: boolean, pagination: ResponsePagination | null, initialListFinished: boolean }>) => void

  // mode  automationFlow
  mode: modeAutomationFlow,
  setMode: (mode: modeAutomationFlow) => void;

}

export const automationFlowGenStore = create<AutomationFlowStore>((set) => ({
  currentNodeIdEditing: null,
  openEdit: false,
  setStartEdit: (data) => set((state) => ({ ...state, ...data })),
  clearEdit: () => set((state) => ({ ...state, openEdit: false, currentNodeIdEditing: null })),

  automationId: null,
  setAutomationId: (data) => set((state) => ({ ...state, ...data })),

  openTriggerSelector: false,
  setTriggerSelector: (data) => set((state) => ({ ...state, ...data })),

  openSelectNode: false,
  setSelectNode: (data) => set((state) => ({ ...state, ...data })),

  openRequestServiceEditor: false,
  setRequestServiceEditor: (data) => set((state) => ({ ...state, ...data })),

  // // getall
  triggersFromtAutomation: [],
  setTriggersFromAutomation: (data) => set((state) => ({ ...state, triggersFromtAutomation: data })),
  information: null,
  listing: false,
  initialListFinished: false,
  setListState: (data) => set((state) => ({ ...state, ...data })),

  // mode  automationFlow
  mode: 'preview',
  setMode: (data) => set((state) => ({ ...state, mode: data })),

}));
