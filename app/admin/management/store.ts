import { create } from "zustand";

type AdminTab = "users" | "workspace";

interface DashboardManagementStore {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
}

export const useDashboardStore = create<DashboardManagementStore>((set) => ({
  activeTab: "users",
  setActiveTab: (tab: AdminTab) => set({ activeTab: tab }),
}));