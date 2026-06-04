import { create } from "zustand";

type AdminTab = "users" | "workspace";

type ChangePass = {
  isOpen: boolean,
  userToChange: string | null
}

interface DashboardManagementStore {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;

  userToDelete: string | null,
  setUserToDelete: (userId: string | null) => void;
  isDialogConfirmDeletionActive: boolean;
  setisDialogConfirmDeletionActive: (isDialogConfirmDeletionActive: boolean) => void;

  changePass: ChangePass,
  setChangePass: (data: ChangePass) => void;
}

export const useDashboardStore = create<DashboardManagementStore>((set) => ({
  activeTab: "users",
  setActiveTab: (tab: AdminTab) => set({ activeTab: tab }),
  isDialogConfirmDeletionActive: false,
  setisDialogConfirmDeletionActive: (isDialogConfirmDeletionActive: boolean) => {
    set({
      isDialogConfirmDeletionActive: isDialogConfirmDeletionActive
    })
  },
  userToDelete: null,
  setUserToDelete: (userId: string | null) => {
    set({
      userToDelete: userId
    })
  },
  changePass: { isOpen: false, userToChange: null },
  setChangePass: (data: ChangePass) => {
    set({
      changePass: data
    })
  }
}));