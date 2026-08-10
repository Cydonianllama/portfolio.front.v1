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
import { useAuthCydoStore } from '@/modules/auth/store/authStore';
import { DialogSettings } from '@/modules/settings/components/DialogSettings';
import { useSettingsStore } from '@/modules/settings/store/settingsStore';
import { Header } from './Header';
import { Footer } from './Footer';
import { SidebarItems } from './config';
import { SuscrciptionCard } from './SuscrciptionCard';
import { UseAsideSyncHook } from '@/modules/app/hooks/asideHookSync';
import { ModulesSection } from './modulesSection';
import { IoSettingsOutline } from 'react-icons/io5';

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function AppSidebar({ pathname }: { pathname: string }) {

  UseAsideSyncHook({}) // eventos de pataforma que afectan al aside

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

        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href={'/settings'}>
                  <IoSettingsOutline />
                  Ajustes
                </Link>}
                tooltip="Settings"
                className={isActive('/settings') ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>



        <SuscrciptionCard />
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
