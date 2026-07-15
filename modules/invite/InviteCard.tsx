import { UseAppData } from "@/hooks/app/useAppData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useInvite } from "./store";
import { CommandInvitation } from "./service.commandinvitation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type InviteCardProps = {
  
}

type invitationCommands = 'accept' | 'decline'

export const InviteCard = ({  }: InviteCardProps) => {
  const router = useRouter()
  const useAppData = UseAppData()
  const invitationStore = useInvite()

  const HandleCommandActioned = async (command: invitationCommands) => {
    try {
      invitationStore.setInvitation({ processingCommand: true })
      const req = await CommandInvitation({ action: command, invitationId: invitationStore.invitationInformation?.invitation?.id || '' })

      if (!req){
        toast.error('Error 1')
        return;
      }

      if (!req?.status){
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

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Invitacion</CardTitle>
          <CardDescription>Invitacion a un workspace</CardDescription>
        </CardHeader>
        <CardContent>
          Has recibido la invitacion al workspace <strong>{invitationStore.invitationInformation?.workspaceFromInvitation?.name}</strong>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={() => { HandleCommandActioned('decline') }} disabled={(invitationStore.gettingInfo || invitationStore.processingCommand) ? true : false} variant={'outline'}>Rechazar</Button>
          <Button onClick={() => { HandleCommandActioned('accept') }} disabled={(invitationStore.gettingInfo || invitationStore.processingCommand) ? true : false} >Aceptar invitación</Button>
        </CardFooter>
      </Card>
    </>
  )
}