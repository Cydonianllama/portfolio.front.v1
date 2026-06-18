import ReactQueryProvider from "@/providers/reactQueryProvider";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  //
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Separator } from "@/components/ui/separator"
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function AppSidebar() {
  return (
    <Sidebar side='left' variant="sidebar" collapsible={'icon'}>
      {/*  */}
      <SidebarHeader>

        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger render={<SidebarMenuButton>
                Select Workspace
                <ChevronDown className="ml-auto" />
              </SidebarMenuButton>}>

              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>Acme Inc</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Acme Inc</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Acme Inc</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>

      </SidebarHeader>
      {/*  */}

      <SidebarContent>

        <SidebarGroup title="Menu">
          <SidebarMenu >
            <SidebarMenuItem>
              <SidebarMenuButton render={<Link href={'/examples/managerv1'}>ejemplo 1</Link>}></SidebarMenuButton>
              <SidebarMenuButton render={<Link href={'/examples/managerv2'}>ejemplo 2</Link>}></SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter>
        
      </SidebarFooter>
    </Sidebar>
  )
}

export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex h-screen flex-col overflow-auto">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Build Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <main className="flex-1">
              {children}
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ReactQueryProvider>
  );
}