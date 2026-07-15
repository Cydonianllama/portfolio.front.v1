'use client'

import { UseAppData } from "@/hooks/app/useAppData";
import { InviteCard } from "./InviteCard";
import { GetInvitationInformation } from "./service.getinvitationinfo";
import { useEffect } from "react";
import { useInvite } from "./store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type InviteScreenProps = {
  invitationId: string 
}

export const InviteScreen = ({ invitationId }: InviteScreenProps) => {
  const useAppData = UseAppData()
  const invitationStore = useInvite()
  const router = useRouter()

  const GetInvitationInformationAction = async () => {
    try {
      invitationStore.setInvitation({ gettingInfo: true })
      const req = await GetInvitationInformation({ invitationId, tokenUser: localStorage.getItem('token') || '' });

      if (!req){
        toast.error('Error 1')
        return;
      }

      if (!req.status){
        toast.error(req.message || 'Error 2')
        router.push('home')
        return
      }

      // toast.success('')
      invitationStore.setInvitation({ invitationInformation: req.data })

      if (req.data.forceRegister){
        router.push('register')
        return;
      }

      if (req.data.forceHome){
        router.push('home')
        return;
      }

    } catch (ex) {
      toast.error('Error inesperado')
    } finally {
      invitationStore.setInvitation({ gettingInfo: false })
    }
  }

  useEffect(() => {
    GetInvitationInformationAction()
  }, [])

  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center">
        <InviteCard />
      </div>
    </>
  )
}