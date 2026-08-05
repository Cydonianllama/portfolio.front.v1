"use client"

/* eslint-disable @next/next/no-img-element */
import { PropsWithChildren, ReactElement } from 'react'
import { FaWhatsapp } from 'react-icons/fa';
import { useChatStore } from '../store/store.chat';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
      className={`${chatStore.roomIdOpened == data.id ? 'bg-gray-50' : ''} cursor-pointer flex gap-2 border-b border-gray-100 py-2`}
      onClick={() => {
        if (handleOpenChat) handleOpenChat(data.id)
      }}
    >
      <div className='flex items-center px-2'>
        <div className='h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center font-semibold text-xs'>
          {data.name.charAt(0)}
        </div>
      </div>
      <div className='flex-1 flex flex-col min-w-0 pr-2'>

        <div className='flex justify-between items-center'>
          <div className='text-xs font-semibold truncate'>
            {data.name}
          </div>
          <div className='flex gap-1.5 items-center shrink-0'>
            <div className='text-[10px] text-gray-400'>
              {data.time}
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant={'ghost'} size={'icon-xs'}><HiDotsHorizontal /></Button>} ></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className='text-[11px] flex gap-1 min-w-0'>
          <div className='flex-1 truncate text-gray-500'>
            {data.lastMessage}
          </div>
          <div className='flex flex-col shrink-0 text-gray-400'>
            {data.icon && (<>{data.icon}</>)}
          </div>
        </div>
      </div>

    </div>
  </>
}
