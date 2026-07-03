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
  return <>
    <Item
      onClick={() => {
        if (handleOpenChat) handleOpenChat(data.id)
      }}
      variant="outline"
      role="listitem"
      render={<a href="#">
        <ItemMedia variant="image">
          <img
            src={data.thumb}
            alt={data.name}
            width={32}
            height={32}
            className="object-cover grayscale"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">
            {data.name} -{" "}
            <span className="text-muted-foreground">{data.name}</span>
          </ItemTitle>
          <ItemDescription>{data.lastMessage}</ItemDescription>
        </ItemContent>
        <ItemContent className="flex-none text-center">
          <ItemDescription>{data.time}</ItemDescription>
        </ItemContent>
      </a>} />
  </>
}