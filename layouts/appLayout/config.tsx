import { ReactElement } from "react";
import { BsChatDots } from "react-icons/bs";
import { FiActivity, FiHome } from "react-icons/fi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
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
    title: 'Actividades',
    goto: '/activities',
    icon: <FiActivity />
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
    title: 'Flujos conversacionales',
    goto: '/automation',
    icon: <TiFlowMerge />
  },
  {
    title: 'Widgets',
    goto: '/widget',
    icon: <IoChatbubbleEllipsesOutline />
  }
]