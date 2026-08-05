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
import Link from "next/link";
import { entityDTO } from "@/api/dataEngine/entity";
import { LuBox } from "react-icons/lu";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ModuleItemProps = {
  data: entityDTO
}

export const ModuleItem = ({ data }: ModuleItemProps) => {
  const useAppData = useAppData()

  return (
    <>
      <SidebarMenuItem >
        <SidebarMenuButton
          render={<Link href={`/modules/${data.id}`}>
            <LuBox />
            {data.name}
          </Link>}
          tooltip="Home"
          // className={isActive(el.goto) ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}
        />
      </SidebarMenuItem>
    </>
  )
}