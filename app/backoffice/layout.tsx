"use client";

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
import { VscFileSubmodule } from "react-icons/vsc";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

import { LuBlocks } from "react-icons/lu";

import { Separator } from "@/components/ui/separator"
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactElement } from "react";
import { WorkspaceDropdown } from "@/layouts/exampleLayout/workspacesDropdown";
import { usePathname } from "next/navigation";

type item_ = {
  title: string
  url: string
  icon?: ReactElement
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}

const items: item_[] = [
  {
    title: 'Modulos',
    url: '-',
    icon: <VscFileSubmodule />,
    isActive: true,
    items: [
      {
        title: 'Usuarios',
        url: '/backoffice/users'
      },
      {
        title: 'Workspaces',
        url: '/backoffice/workspace'
      },
      {
        title: 'Automatizaciones',
        url: '/backoffice/automation'
      },
      {
        title: 'Planes',
        url: '/backoffice/plans'
      },
      {
        title: 'Contact',
        url: '/backoffice/contact'
      },
    ]
  },
]

function AppSidebar() {
  return (
    <Sidebar side='left' variant="sidebar" collapsible={'icon'}>
      {/*  */}
      <SidebarHeader>
        <WorkspaceDropdown />
      </SidebarHeader>
      {/*  */}

      <SidebarContent>

        {/* <SidebarGroup title="Menu">
          <SidebarMenu >
            <SidebarMenuItem>
              <SidebarMenuButton render={<Link href={'/examples/managerv1'}>ejemplo 1</Link>}></SidebarMenuButton>
              <SidebarMenuButton render={<Link href={'/examples/managerv2'}>ejemplo 2</Link>}></SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup> */}

        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => (
              <Collapsible
                key={item.title}
                render={<SidebarMenuItem>
                  <CollapsibleTrigger render={<SidebarMenuButton tooltip={item.title}>
                    {item.icon}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>}>

                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton render={<a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>}>

                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>}
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
              </Collapsible>
            ))}
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
  const pathname = usePathname();

  if (pathname === "/backoffice/login") {
    return <>{children}</>;
  }

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
                        App
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>module</BreadcrumbPage>
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
