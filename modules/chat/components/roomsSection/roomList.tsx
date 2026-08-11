/* eslint-disable react/display-name */
import {
  ItemGroup,
} from "@/components/ui/item"
import { RoomCard } from "./roomCard"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RoomDTO } from "@/api/chat/chat.dto"
import { FaWhatsapp } from 'react-icons/fa';

// utils
import {
  format,
  isToday,
  isYesterday,
  isThisWeek,
} from "date-fns";
import { memo, useCallback, useEffect, useRef } from "react";
import { useChatStore } from "../../store/store.chat";
import { RiTelegram2Line } from "react-icons/ri";
import { useChatRefs } from "../../hooks/useChatRefs";
import { useChatScrollInfinite } from "../../hooks/useChatScrollInfinite";

function formatChatDate(date: Date | string) {
  const creationDate = new Date(date);

  if (isToday(creationDate)) {
    return format(creationDate, "HH:mm");
  }

  if (isYesterday(creationDate)) {
    return "Ayer";
  }

  if (isThisWeek(creationDate, { weekStartsOn: 1 })) {
    return format(creationDate, "EEEE"); // lunes, martes...
  }

  return format(creationDate, "yyyy/MM/dd");
}

export type ChatListProps = {
  contacts: Array<RoomDTO>
  HandleOpenChat: (contactId: string) => void
  handleLoadMoreContacts: () => void
}

export const RoomList = memo(({ contacts, HandleOpenChat, handleLoadMoreContacts }: ChatListProps) => {
  // referencias de la seccion del listado de contactos
  const { downRefContacts, wrapperContacts } = useChatRefs()

  //
  // Paginacion: al scrollear hacia elúltimo elemento se volvera a listar más elementos
  //
  useChatScrollInfinite({
    downRefContacts,
    handleLoadMoreContacts,
    wrapperContacts
  })
  
  return (<>
    <ScrollArea ref={wrapperContacts} className="h-full">
      <div className="flex flex-col" >
        {contacts.map((item, index) => (
          <RoomCard
            handleOpenChat={HandleOpenChat}
            data={{
              id: item.id,
              lastMessage: item.lastMessage || 'No registramos mensajes',
              name: item.typeRoom == 'individual' ? (item.participants[0].contactName || '') : item.name,
              thumb: '',
              time: item.creationDate ? formatChatDate(item.creationDate) : '',
              icon: item.platformId == 'whatsapp' ? <FaWhatsapp className='inline' /> : <RiTelegram2Line className='inline' />
            }}
            key={item.id || index}
          />
        ))}
        <div ref={downRefContacts} ></div>
      </div>
    </ScrollArea>
  </>)
})