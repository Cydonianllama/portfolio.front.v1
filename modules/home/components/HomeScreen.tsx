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
import { UXCardSteptVariantDefault } from "./cardStepVariantDefault/UXCardSteptVariantDefault"
import { stepsUX } from "./catalogs/data"

import { useAppData } from "@/hooks/app/useAppData";
import { LayoutScreen } from "@/components/layoutScreen"
import { TemplateSection } from "./templateSection"
import { ActionsSections } from "./actionsSection"
import { HeadingHome } from "./heading"

type HomeScreenProps = {}

export const HomeScreen = ({ }: HomeScreenProps) => {
  const appData = useAppData()

  return (
    <LayoutScreen layoutFor="home" domConfig={{ className: 'space-y-10' }}>

      {/*  */}
      {/* <UXCardSteptVariantDefault list={stepsUX} /> */}
      {/*  */}

      {/*  */}
      {/* <section className="flex justify-center w-full">
          <ItemGroup className="">
            <Item variant="outline">
              <ItemContent>
                <ItemTitle>You are trying out the growth plan</ItemTitle>
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
        </section> */}
      {/*  */}

      <HeadingHome 
        name="Erickuchín"
      />

      <TemplateSection
        templates={[
          { tags: ['automation', 'whatsapp'], title: 'Template para funtion 1' },
          { tags: ['automation', 'widget'], title: 'Template para funtion 2' },
          { tags: ['automation', 'telegram'], title: 'Template para funtion 3' }
        ]}
      />

      <ActionsSections
        title="Revisa nuestros tutoriales"
        subtitle="Tenemos un conjunto de tutoriales listos para lanzarlos."
        actions={[
          { title: 'Titulo para tutorial 1', description: 'Esta es una descripcion genérica para este modulo', goto: '/nothing', urlImage: 'https://i.pinimg.com/736x/5c/c1/7a/5cc17a954718c1c1a1883a9f5418b6fc.jpg' },
          { title: 'Titulo para tutorial 2', description: 'Esta es una descripcion genérica para este modulo', goto: '/nothing', urlImage: 'https://i.pinimg.com/736x/5c/c1/7a/5cc17a954718c1c1a1883a9f5418b6fc.jpg' },
          { title: 'Titulo para tutorial 3', description: 'Esta es una descripcion genérica para este modulo', goto: '/nothing', urlImage: 'https://i.pinimg.com/736x/5c/c1/7a/5cc17a954718c1c1a1883a9f5418b6fc.jpg' },
        ]} 
      />

    </LayoutScreen>
  )
}