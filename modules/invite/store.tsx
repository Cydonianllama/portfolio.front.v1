import { create } from "zustand";
import { GetInvitationInformationResponseDTO } from "@/api/invite/getInvitationInfo";

interface InviteStore {
  processingCommand: boolean;
  gettingInfo: boolean;
  invitationInformation: GetInvitationInformationResponseDTO | null
  setInvitation: (data: Partial<{ invitationInformation: GetInvitationInformationResponseDTO | null, gettingInfo: boolean, processingCommand: boolean }>) => void
}

export const useInvite = create<InviteStore>((set) => ({
  gettingInfo: true,
  processingCommand: false,
  invitationInformation: null,
  setInvitation: (data) => set((state) => ({ ...state, ...data })),
}));
