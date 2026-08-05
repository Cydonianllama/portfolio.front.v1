/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useAppData } from "@/hooks/app/useAppData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"

type showcaseSubscriptionProps = {

}

export const ShowcaseSubscription = ({ }: showcaseSubscriptionProps) => {
  const appData = useAppData()
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Nombre subscripcion</CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="  max-w-xs">
            <Progress value={10} className="">
              <ProgressLabel>Contactos</ProgressLabel>
              <ProgressValue />
            </Progress>
          </div>
          <div className=" max-w-xs">
            <Progress value={60} className="">
              <ProgressLabel>Miembros</ProgressLabel>
              <ProgressValue />
            </Progress>
          </div>
        </CardContent>
      </Card>
    </>
  )
}