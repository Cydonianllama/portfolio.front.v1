'use client'

// components
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { ChevronRightIcon, CreditCardIcon, ShieldIcon, UserIcon, ExternalLinkIcon, MoreHorizontalIcon, SettingsIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { HelpCircleIcon } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { BookOpenIcon, LinkIcon } from 'lucide-react'
import { useAppData } from "@/hooks/app/useAppData";
import { UXCardSteptVariantDefault } from "./CardStepVariantDefault/UXCardSteptVariantDefault"
import { stepsUX } from "./configurations/data"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type HomeScreenProps = {

}

export const HomeScreen = ({ }: HomeScreenProps) => {
  const appData = useAppData()

  return (
    <>
      <div className="px-40 space-y-5 py-5">

        {/*  */}
        <UXCardSteptVariantDefault list={stepsUX} />
        {/*  */}

        {/*  */}
        <section className="flex justify-center w-full">
          <ItemGroup className="">
            <Item variant="outline">
              <ItemContent>
                <ItemTitle>You are trying out the growth plan</ItemTitle>
                {/* <ItemDescription></ItemDescription> */}
                <Progress className={'py-2'} value={33} />
                <div className="text-muted-foreground text-xs">
                  21 days until the trial expires
                </div>
              </ItemContent>
              <ItemActions>
                <Button variant="outline" size="sm">
                  Action
                </Button>
              </ItemActions>
            </Item>
          </ItemGroup>
        </section>
        {/*  */}
      </div>
    </>
  )
}