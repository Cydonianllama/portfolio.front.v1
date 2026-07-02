"use client";
import { useRouter } from 'next/navigation'

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
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FaRegUser } from "react-icons/fa";
import { logoutBackoffice } from "@/modules/backoffice/auth/services/auth.service";
import { useAuthStore } from '@/modules/backoffice/auth/store/store';
import { WorkspaceDropdown } from './workspacesDropdown';
import { FiHome } from 'react-icons/fi';
import { TiFlowMerge } from "react-icons/ti";
import { BsChatDots } from "react-icons/bs";
import { LuUsersRound } from "react-icons/lu";
import { MdOutlineManageAccounts } from "react-icons/md";

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
    title: 'Home',
    url: '/home',
    icon: <span className="[&>svg]:size-4"><FiHome /></span>,
  },
  {
    title: 'Momo',
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
  '/': { label: 'Dashboard' },
  '/users': { label: 'Usuarios', parent: 'Modulos' },
  '/workspace': { label: 'Workspaces', parent: 'Modulos' },
  '/plans': { label: 'Planes', parent: 'Modulos' },
  '/contact': { label: 'Contact', parent: 'Modulos' },
  '/automation': { label: 'Automatizaciones', parent: 'Modulos' },
}

function getBreadcrumb(pathname: string) {
  const config = breadcrumbMap[pathname] || { label: 'Módulo' }
  return config
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function AppSidebar({ pathname }: { pathname: string }) {

  const authBackofficeStore = useAuthStore()

  const router = useRouter()

  const isActive = (url: string) => {
    if (url === '/backoffice') return pathname === '/backoffice'
    return pathname.startsWith(url)
  }

  return (
    <Sidebar side='left' variant="sidebar" collapsible={'icon'}>
      <SidebarHeader>
        <WorkspaceDropdown />
      </SidebarHeader>

      <SidebarContent>
        {/* Dashboard link standalone */}
        <SidebarGroup>
          <SidebarMenu className="gap-3">
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href="/home">
                  <FiHome />
                  Home
                </Link>}
                tooltip="Home"
                className={isActive('/home') ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}
              />
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href="/automation">
                  <TiFlowMerge />
                  Automatizaciones
                </Link>}
                tooltip="Automatizaciones"
                className={isActive('/automation') ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}
              />
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href="/chat">
                  <BsChatDots />
                  Chat
                </Link>}
                tooltip="Home"
                className={isActive('/chat') ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}
              />
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href="/contacts">
                  <LuUsersRound />
                  Contactos
                </Link>}
                tooltip="Home"
                className={isActive('/contacts') ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}
              />
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href="/admin">
                  <MdOutlineManageAccounts />
                  Administracion
                </Link>}
                tooltip="Home"
                className={isActive('/admin') ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Módulos collapsible */}
        {/* <SidebarGroup>
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
        </SidebarGroup> */}

      </SidebarContent>

      {/* ─── Footer: Tarjeta de usuario ─────────────────────────────────────── */}
      <SidebarFooter>

        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu >
              <DropdownMenuTrigger render={<SidebarMenuButton
                size='lg'
                render={<div className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer">
                  <Avatar className="h-8 w-8 rounded-lg">
                    {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{authBackofficeStore.basicUserInformation.fullname}</span>
                    <span className="truncate text-xs">{authBackofficeStore.basicUserInformation.email}</span>
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
                      <span className="text-sm font-medium truncate">{authBackofficeStore.basicUserInformation.fullname}</span>
                      <span className="text-xs text-muted-foreground truncate">{authBackofficeStore.basicUserInformation.email}</span>
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
                <DropdownMenuItem onClick={() => {
                  logoutBackoffice()
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

export default function AppLayout({
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
