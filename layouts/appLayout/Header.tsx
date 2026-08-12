import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { useAppStore } from '@/modules/app/stores/appStore';
import { NotificationDropdown } from '@/modules/app/components/NotificationDropdown';
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
  SidebarTrigger
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator";


export function Header({ pathname }: { pathname: string }) {

  const appStore = useAppStore()

  return (
    <header className="px-4 flex justify-between h-11 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-none">
      <div className="flex items-center gap-2 ">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">App</BreadcrumbLink>
            </BreadcrumbItem>

            {appStore.Breadcrum.map((el, index) => (
              <>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem key={index}>
                  <BreadcrumbPage>{el.text}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div>
        <NotificationDropdown />
      </div>
    </header>
  )
}