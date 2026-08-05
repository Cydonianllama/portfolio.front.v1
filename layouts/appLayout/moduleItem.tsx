import {
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import Link from "next/link";
import { entityDTO } from "@/api/dataEngine/entity";
import { LuBox } from "react-icons/lu";
import { catalogEntityIcons } from "@/modules/settings/components/ModulesSection/catalog/icons.catalog";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ModuleItemProps = {
  data: entityDTO
}

export const ModuleItem = ({ data }: ModuleItemProps) => {

  return (
    <>
      <SidebarMenuItem >
        <SidebarMenuButton
          render={<Link href={`/modules/${data.id}`}>
            {catalogEntityIcons.find(el => el.code == data.codeIcon) ? catalogEntityIcons.find(el => el.code == data.codeIcon)?.Icon : <LuBox />}
            {data.name}
          </Link>}
          tooltip="Home"
          // className={isActive(el.goto) ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}
        />
      </SidebarMenuItem>
    </>
  )
}