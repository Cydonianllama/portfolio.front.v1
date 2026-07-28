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

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WorkspaceDropdown } from '../../modules/app/components/workspacesDropdown';
import { useAuthCydoStore } from '@/modules/auth/store/store';
import { DialogSettings } from '@/modules/settings/components/DialogSettings';
import { useSettingsStore } from '@/modules/settings/store/settingsStore';
import { Header } from './Header';
import { Footer } from './Footer';
import { SidebarItems } from './config';
import { FaArrowUpRightDots } from "react-icons/fa6";
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useSidebar } from "@/components/ui/sidebar"
import { SuscrciptionCard } from './SuscrciptionCard';
import { UseAsideSyncHook } from '@/modules/app/hooks/asideHookSync';
import { ModulesSection } from './modulesSection';

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function AppSidebar({ pathname }: { pathname: string }) {

  UseAsideSyncHook({}) // eventos de pataforma que afectan al aside

  const settingsStore = useSettingsStore()
  const userStore = useAuthCydoStore()
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

        <div className='flex-1'>
          {/* Dashboard link standalone */}
          <SidebarGroup>
            <SidebarMenu className="gap-3 ">
              {SidebarItems.map((el, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    render={<Link href={el.goto}>
                      {el.icon}
                      {el.title}
                    </Link>}
                    tooltip="Home"
                    className={isActive(el.goto) ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          <ModulesSection />
        </div>

        <SuscrciptionCard />

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
      <Footer />
    </Sidebar>
  )
}


// ─── Layout principal ────────────────────────────────────────────────────────

export default function AppLayout({ children, }: { children: React.ReactNode; }) {

  const pathname = usePathname();

  if (pathname === "/backoffice/login") {
    return <>{children}</>;
  }

  return (<>
    <ReactQueryProvider>
      <div className="h-screen w-screen max-h-screen max-w-full">
        <SidebarProvider className='h-full w-full'>
          <AppSidebar pathname={pathname} />
          <SidebarInset className='h-full w-full min-w-0'>
            <div className='h-full flex flex-col w-full min-w-0'>
              <Header pathname={pathname} />
              <div className='flex-1 min-h-0 w-full min-w-0'>
                {children}
              </div>
            </div>
            <DialogSettings />
          </SidebarInset>
        </SidebarProvider>
      </div>
    </ReactQueryProvider>

  </>);
}
