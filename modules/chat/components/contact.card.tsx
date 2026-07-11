"use client"

/* eslint-disable @next/next/no-img-element */
import { PropsWithChildren } from 'react'
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

export interface ContactCardData {
  id: string;
  name: string;
  lastMessage: string;
  thumb: string;
  time: string
}

export interface ContactCardProps {
  data: ContactCardData
  handleOpenChat?: (roomId: string) => void;
}

export const ContactCard = ({ data, handleOpenChat }: PropsWithChildren<ContactCardProps>) => {
  const chatStore = useChatStore()
  return <>
    <Item
      className={`${chatStore.roomIdOpened == data.id ? 'border-blue-400' : ''} cursor-pointer`}
      onClick={() => {
        if (handleOpenChat) handleOpenChat(data.id)
      }}
      variant="outline"
      role="listitem"
      render={<div>
        {data.thumb && (<>
          <ItemMedia variant="image">
            <img
              src={data.thumb}
              alt={data.name}
              width={32}
              height={32}
              className="object-cover grayscale"
            />
          </ItemMedia>
        </>)}
        {!data.thumb && (<>
          <div className='h-7 bg-gray-200 text-gray-700 flex items-center justify-center font-bold w-7 rounded-full'>
            {data.name.charAt(0)}
          </div>
        </>)}
        <ItemContent>
          <ItemTitle className="line-clamp-1">
            {data.name}
          </ItemTitle>
          <ItemDescription>
            <FaWhatsapp className='inline' /> {data.lastMessage}
          </ItemDescription>
        </ItemContent>
        <ItemContent className="flex-none text-xs">
          <ItemDescription>{data.time}</ItemDescription>
        </ItemContent>
      </div>} />
  </>
}