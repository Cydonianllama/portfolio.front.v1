"use client"

/* eslint-disable @next/next/no-img-element */
import { PropsWithChildren, ReactElement } from 'react'
import { FaWhatsapp } from 'react-icons/fa';
import { useChatStore } from '../../store/store.chat';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { HiDotsHorizontal, HiDotsVertical } from 'react-icons/hi';

export interface RoomCardData {
  id: string;
  name: string;
  lastMessage: string;
  thumb: string;
  time: string;
  icon?: ReactElement
}

export interface RoomCardProps {
  data: RoomCardData
  handleOpenChat?: (roomId: string) => void;
}

export const RoomCard = ({ data, handleOpenChat }: PropsWithChildren<RoomCardProps>) => {
  const chatStore = useChatStore()
  return <>
    <div
      className={`${chatStore.roomIdOpened == data.id ? 'bg-gray-100 ' : ''} cursor-pointer flex gap-2 border-b h-18`}
      onClick={() => {
        if (handleOpenChat) handleOpenChat(data.id)
      }}
    >

      {/* left side  */}
      <div className='flex items-start px-2 h-full py-2'>
        <div className='h-6 w-6 bg-gray-200 text-foreground rounded-full flex items-center justify-center font-semibold text-xs'>
          {data.name.charAt(0)}
        </div>
      </div>
      {/* end :: left side  */}

      {/* content  */}
      <div className='flex-1 flex flex-col justify-between min-w-0 py-2 pr-2'>

        {/* name - time Row */}
        <div className='flex justify-between relative pr-4'>
          <div className='text-xs font-semibold truncate text-foreground align-top inline'>
            {data.name}
          </div>
          <div className='flex gap-1.5 shrink-0'>
            <div className='text-[10px] text-gray-400 align-top inline'>
              {data.time}
            </div>
            <div>
              <DropdownMenu modal>
                <DropdownMenuTrigger render={
                  <Button className={' absolute top-0 right-0'} onClick={(e) => { e.stopPropagation() }} variant={'ghost'} size={'icon-xs'}>
                    <HiDotsVertical />
                  </Button>
                }>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Eliminar</DropdownMenuItem>
                  <DropdownMenuItem>Archivar</DropdownMenuItem>
                  <DropdownMenuItem>Marcar como leido</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        {/* end :: name - time Row */}

        {/* last message - Row */}
        <div className='text-[11px] flex items-center  gap-1 min-w-0'>
          <div className='flex-1 truncate text-gray-500'>
            {data.lastMessage}
          </div>
          <div className='flex flex-col shrink-0 text-gray-400'>
            {data.icon && (<>{data.icon}</>)}
          </div>
        </div>
        {/* end :: last message - Row */}
      </div>
      {/* end content */}

    </div>
  </>
}
