import { GetInvitationInformation } from "@/api/invite/getInvitationInfo"
import { useRouter } from "next/router"
import { toast } from "sonner"
import { useInvite } from "../store"
import { CommandInvitation } from "@/api/invite/commandInvitation"

export function useInvitationAction() {
  const invitationStore = useInvite()
  const router = useRouter()

  const getInvitationInfoAction = async ({ invitationId, token }: { invitationId: string, token: string }) => {
    try {
      invitationStore.setInvitation({ gettingInfo: true })
      const req = await GetInvitationInformation({
        invitationId, tokenUser: token
      });

      if (!req) {
        toast.error('Error 1')
        return;
      }

      if (!req.status) {
        toast.error(req.message || 'Error 2')
        router.push('home')
        return
      }

      // toast.success('')
      invitationStore.setInvitation({ invitationInformation: req.data })

      if (req.data.forceRegister) {
        router.push('register')
        return;
      }

      if (req.data.forceHome) {
        router.push('home')
        return;
      }

    } catch (ex) {
      toast.error('Error inesperado')
    } finally {
      invitationStore.setInvitation({ gettingInfo: false })
    }
  }

  const commandInvitationAction = async ({ command, invitationId }: { command: string, invitationId: string }) => {
    try {
      invitationStore.setInvitation({ processingCommand: true })
      const req = await CommandInvitation({ action: command, invitationId })

      if (!req) {
        toast.error('Error 1')
        return;
      }

      if (!req?.status) {
        toast.error(req.message || 'Error 2')
        return;
      }

      // success
      if (command == 'accept') router.replace(`/home?workspaceId=${invitationStore.invitationInformation?.workspaceFromInvitation?.id}`)
      else if (command == 'decline') router.replace('/home')

    } catch (error) {

    } finally {
      invitationStore.setInvitation({ processingCommand: false })
    }
  }


  return {
    getInvitationInfoAction,
    commandInvitationAction
  }
}