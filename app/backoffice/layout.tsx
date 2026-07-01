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

import { Separator } from "@/components/ui/separator"
import { ChevronRight, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";
import { WorkspaceDropdown } from "@/layouts/exampleLayout/workspacesDropdown";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// ─── Tipos ───────────────────────────────────────────────────────────────────

type NavItem = {
  title: string
  url: string
  icon?: ReactElement
  items?: { title: string; url: string }[]
}

// ─── Configuración de navegación ─────────────────────────────────────────────

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/backoffice',
    icon: <span className="[&>svg]:size-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg></span>,
  },
  {
    title: 'Modulos',
    url: '#',
    icon: <span className="[&>svg]:size-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-blocks"><rect width="7" height="7" x="14" y="3" rx="1" /><path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" /></svg></span>,
    items: [
      { title: 'Usuarios', url: '/backoffice/users' },
      { title: 'Workspaces', url: '/backoffice/workspace' },
      { title: 'Planes', url: '/backoffice/plans' },
      // { title: 'Contact', url: '/backoffice/contact' },
      // { title: 'Automatizaciones', url: '/backoffice/automation' },
    ]
  },
]

// ─── Mapeo de rutas a breadcrumb ───────────────────────────────────────────

const breadcrumbMap: Record<string, { label: string; parent?: string }> = {
  '/backoffice': { label: 'Dashboard' },
  '/backoffice/users': { label: 'Usuarios', parent: 'Modulos' },
  '/backoffice/workspace': { label: 'Workspaces', parent: 'Modulos' },
  '/backoffice/plans': { label: 'Planes', parent: 'Modulos' },
  '/backoffice/contact': { label: 'Contact', parent: 'Modulos' },
  '/backoffice/automation': { label: 'Automatizaciones', parent: 'Modulos' },
}

function getBreadcrumb(pathname: string) {
  const config = breadcrumbMap[pathname] || { label: 'Módulo' }
  return config
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function AppSidebar({ pathname }: { pathname: string }) {
  const isActive = (url: string) => {
    if (url === '/backoffice') return pathname === '/backoffice'
    return pathname.startsWith(url)
  }

  return (
    <Sidebar side='left' variant="sidebar" collapsible={'icon'}>
      {/* <SidebarHeader>
        <WorkspaceDropdown />
      </SidebarHeader> */}

      <SidebarContent>
        {/* Dashboard link standalone */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href="/backoffice">
                  <span className="flex items-center gap-2">
                    <span className="[&>svg]:size-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg></span>
                    <span>Dashboard</span>
                  </span>
                </Link>}
                tooltip="Dashboard"
                className={isActive('/backoffice') ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Módulos collapsible */}
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.filter(i => i.items).map((item) => (
              <Collapsible
                key={item.title}
                render={
                  <SidebarMenuItem>
                    <CollapsibleTrigger
                      render={
                        <SidebarMenuButton tooltip={item.title}>
                          <span className="flex items-center gap-2">
                            {item.icon}
                            <span>{item.title}</span>
                          </span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      }
                    />
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => {
                          const active = isActive(subItem.url)
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                render={
                                  <Link href={subItem.url} className={active ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' : ''}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                }
                                className={active ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}
                              />
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                }
                defaultOpen={item.items?.some(sub => isActive(sub.url))}
                className="group/collapsible"
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* ─── Footer: Tarjeta de usuario ─────────────────────────────────────── */}
      <SidebarFooter>

        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="px-(--sidebar-spacing) py-2">
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full outline-none">
                    <div className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors cursor-pointer">
                      <Avatar size="default" className="h-8 w-8">
                        <AvatarFallback className="text-xs">AD</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start text-left overflow-hidden">
                        <span className="text-sm font-medium truncate">Admin User</span>
                        <span className="text-xs text-muted-foreground truncate">admin@example.com</span>
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" side="right" className="w-56">

                    <DropdownMenuGroup>
                      <div className="flex items-center gap-3 rounded-lg px-2 py-2">
                        <Avatar size="default" className="h-8 w-8">
                          <AvatarFallback className="text-xs">AD</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start text-left overflow-hidden">
                          <span className="text-sm font-medium truncate">Admin User</span>
                          <span className="text-xs text-muted-foreground truncate">admin@example.com</span>
                        </div>
                      </div>
                      {/* <DropdownMenuSeparator /> */}
                      {/* <DropdownMenuItem>
                        <User data-icon="inline-start" />
                        Perfil
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings data-icon="inline-start" />
                        Preferenias
                      </DropdownMenuItem> */}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut data-icon="inline-start" />
                      Cerrar sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>


      </SidebarFooter>
    </Sidebar>
  )
}

// ─── Header reutilizable ─────────────────────────────────────────────────────

function BackofficeHeader({ pathname }: { pathname: string }) {
  const breadcrumb = getBreadcrumb(pathname)

  return (
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
              <BreadcrumbLink href="#">App</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            {breadcrumb.parent && (
              <>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbPage>{breadcrumb.parent}</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}

// ─── Layout principal ────────────────────────────────────────────────────────

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
        <AppSidebar pathname={pathname} />
        <SidebarInset>
          <div className="flex h-screen flex-col overflow-auto">
            <BackofficeHeader pathname={pathname} />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ReactQueryProvider>
  );
}
