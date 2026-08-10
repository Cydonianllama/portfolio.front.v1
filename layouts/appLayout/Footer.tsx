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
import { UserCard } from "./userCard"

export const Footer = () => {
  return <>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <UserCard />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </>
}