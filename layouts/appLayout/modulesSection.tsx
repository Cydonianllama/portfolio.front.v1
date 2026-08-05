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
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { ModuleItem } from "./moduleItem";
import { useAside } from "@/modules/app/stores/asideStore";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ModulesSectionProps = {

}

export const ModulesSection = ({ }: ModulesSectionProps) => {
  const appData = useAppData()
  const asideStore = useAside()

  return (
    <>
      <SidebarGroup className='flex-1'>
        <SidebarMenu className="gap-3 ">
          {asideStore.entities.map((el, index) => (
            <ModuleItem data={el} key={index} />
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  )
}