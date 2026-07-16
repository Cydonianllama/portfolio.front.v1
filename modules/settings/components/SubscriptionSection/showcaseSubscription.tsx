/* eslint-disable @typescript-eslint/no-empty-object-type */
import { UseAppData } from "@/hooks/app/useAppData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
type showcaseSubscriptionProps = {
  
}

export const ShowcaseSubscription = ({  }: showcaseSubscriptionProps) => {
  const useAppData = UseAppData()
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Suscription</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  )
}