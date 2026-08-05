import { useAppData } from "@/hooks/app/useAppData";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar"
import { FaArrowUpRightDots } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type SuscrciptionCardProps = {

}

export const SuscrciptionCard = ({ }: SuscrciptionCardProps) => {
  const useAppData = useAppData()
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()

  return (
    <>
      {/* tarjeta de suscripcion */}
      <SidebarGroup>
        <SidebarMenu className="gap-3">
          <SidebarMenuItem>
            {!open && (
              <SidebarMenuButton
                // size='lg'
                render={<>
                  <Button variant={'outline'} size={'icon'}>
                    <FaArrowUpRightDots />
                  </Button>
                </>}
              />
            )}
            {open && (<>
              <div className="bg-white flex flex-col justify-start p-3 border rounded-lg gap-3">
                <div className="flex justify-between items-start relative">
                  <h2 className="font-semibold text-xs text-foreground">Version de prueba</h2>
                  <div className="absolute top-[-30%] right-0">
                    <Button className={'text-foreground'} variant="outline" size="xs">
                      Ver planes
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex flex-col gap-0.5">
                    <Progress value={20} className="w-full max-w-sm gap-0.5">
                      <ProgressLabel className={'text-xs'}>Estas en Trial</ProgressLabel>
                      <ProgressValue className={'text-xs'} />
                    </Progress>
                    <div className="text-muted-foreground text-xs">
                      7 días para finalizar trial
                    </div>
                  </div>
                  <div className="">
                    <Progress value={56} className="w-full max-w-sm gap-0.5">
                      <ProgressLabel className={'text-xs'}>Contactos</ProgressLabel>
                      <ProgressValue className={'text-xs'} />
                    </Progress>
                  </div>
                </div>
              </div>
            </>)}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </>
  )
}