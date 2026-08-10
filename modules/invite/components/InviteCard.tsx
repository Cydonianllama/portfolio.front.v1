import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner";
import { useInvite } from "../store";
import { useInvitationAction } from "../actions/useInvitationActions";

export function SkeletonCard() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
    </Card>
  )
}

type InviteCardProps = {}

type invitationCommands = 'accept' | 'decline'

export const InviteCard = ({ }: InviteCardProps) => {
  const { commandInvitationAction } = useInvitationAction()
  const invitationStore = useInvite()

  const HandleCommandActioned = async (command: invitationCommands) => {
    commandInvitationAction({ command, invitationId: invitationStore.invitationInformation?.invitation?.id || '' })
  }

  return (
    <>
      {invitationStore.gettingInfo && (<SkeletonCard />)}
      {!invitationStore.gettingInfo && (<>
        <Card>
          <CardHeader>
            <CardTitle>Invitacion</CardTitle>
            <CardDescription>Invitacion a un workspace</CardDescription>
          </CardHeader>
          <CardContent>
            Has recibido la invitacion al workspace <strong>{invitationStore.invitationInformation?.workspaceFromInvitation?.name}</strong>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={() => { HandleCommandActioned('decline') }} disabled={(invitationStore.gettingInfo || invitationStore.processingCommand) ? true : false} variant={'outline'}>
              {invitationStore.processingCommand && <Spinner data-icon="inline-start" />}
              Rechazar
            </Button>
            <Button onClick={() => { HandleCommandActioned('accept') }} disabled={(invitationStore.gettingInfo || invitationStore.processingCommand) ? true : false} >
              {invitationStore.processingCommand && <Spinner data-icon="inline-start" />}
              Aceptar invitación
            </Button>
          </CardFooter>
        </Card>
      </>)}
    </>
  )
}