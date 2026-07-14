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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type InviteCardProps = {
  
}

export const InviteCard = ({  }: InviteCardProps) => {
  const useAppData = UseAppData()

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Invitacion</CardTitle>
          <CardDescription>Invitacion a un workspace</CardDescription>
        </CardHeader>
        <CardContent>
          Has recibido la invitacion al workspace <strong>Workspace name</strong>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant={'outline'}>Rechazar</Button>
          <Button>Aceptar invitación</Button>
        </CardFooter>
      </Card>
    </>
  )
}