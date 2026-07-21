"use client"

/* eslint-disable @next/next/no-img-element */
import { PropsWithChildren, ReactElement } from 'react'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { FaWhatsapp } from 'react-icons/fa';
import { useChatStore } from '../store/store.chat';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { HiDotsHorizontal } from 'react-icons/hi';

export interface ContactCardData {
  id: string;
  name: string;
  lastMessage: string;
  thumb: string;
  time: string;
  icon?: ReactElement
}

export interface ContactCardProps {
  data: ContactCardData
  handleOpenChat?: (roomId: string) => void;
}

export const ContactCard = ({ data, handleOpenChat }: PropsWithChildren<ContactCardProps>) => {
  const chatStore = useChatStore()
  return <>
    <div
      className={`${chatStore.roomIdOpened == data.id ? 'bg-gray-50' : ''} cursor-pointer flex gap-2 p-2 rounded-lg`}
      onClick={() => {
        if (handleOpenChat) handleOpenChat(data.id)
      }}
    >
      <div className='flex items-center'>
        <div className='h-7 w-7 bg-gray-300 rounded-full flex items-center justify-center font-semibold'>
          {data.name.charAt(0)}
        </div>
      </div>
      <div className='flex-1 flex flex-col gap-1.5'>

        <div className='flex  justify-between'>
          <div className='text-xs  font-semibold'>
            {data.name}
          </div>
          <div className='flex gap-1.5 items-center'>
            <div className='text-xs text-gray-400 '>
              {data.time}
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant={'ghost'} size={'icon-xs'}><HiDotsHorizontal /></Button>} ></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuSeparator /> 
                  {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem> */}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className='text-xs flex gap-1'>
          <div className='flex-1'>
            {data.lastMessage}
          </div>
          <div className='flex flex-col'>
            {data.icon && (<>{data.icon}</>)}
          </div>

        </div>
      </div>

    </div>
  </>
}