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
import { useRouter } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthCydoStore } from "@/modules/auth/store/authStore"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, Settings, User } from "lucide-react"
import { useSettingsStore } from "@/modules/settings/store/settingsStore"
import { Logout } from "@/api/auth/logout"

export const Footer = () => {
  const router = useRouter()
  const userStore = useAuthCydoStore()
  const settingsStore = useSettingsStore()
  
  return <>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu >
            <DropdownMenuTrigger nativeButton={false} render={<SidebarMenuButton
              size='lg'
              render={<div className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer">
                <Avatar className="h-8 w-8 rounded-lg">
                  {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{userStore.basicUserInformation.fullname}</span>
                  <span className="truncate text-xs">{userStore.basicUserInformation.email}</span>
                </div>
              </div>}
            />}>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" side="right" className="w-56">

              <DropdownMenuGroup>
                <div className="flex items-center gap-3 rounded-lg ">
                  <Avatar size="default" className="h-8 w-8">
                    <AvatarFallback className="text-xs">AD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-left overflow-hidden">
                    <span className="text-sm font-medium truncate">{userStore.basicUserInformation.fullname}</span>
                    <span className="text-xs text-muted-foreground truncate">{userStore.basicUserInformation.email}</span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    settingsStore.setOpen(true)
                  }}
                >
                  <User data-icon="inline-start" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    settingsStore.setOpen(true)
                  }}
                >
                  <Settings data-icon="inline-start" />
                  Preferenias
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                Logout()
                router.refresh()
              }}>
                <LogOut data-icon="inline-start" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </>
}