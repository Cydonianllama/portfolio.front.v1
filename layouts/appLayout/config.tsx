import { ReactElement } from "react";
import { BsChatDots } from "react-icons/bs";
import { FiActivity, FiHome } from "react-icons/fi";
import { LuUsersRound } from "react-icons/lu";
import { TiFlowMerge } from "react-icons/ti";

interface SidebarItemProps {
  title: string,
  goto: string,
  icon: ReactElement
}

export const SidebarItems: Array<SidebarItemProps> = [
  {
    title: 'Home',
    goto: '/home',
    icon: <FiHome />
  },
  {
    title: 'Contactos',
    goto: '/contacts',
    icon: <LuUsersRound />
  },
  {
    title: 'Chat',
    goto: '/chat',
    icon: <BsChatDots />
  },
  {
    title: 'Automatizaciones',
    goto: '/automation',
    icon: <TiFlowMerge />
  },
  {
    title: 'Actividades',
    goto: '/activities',
    icon: <FiActivity />
  }
]