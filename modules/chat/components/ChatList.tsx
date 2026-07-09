/* eslint-disable react/display-name */
import {
  ItemGroup,
} from "@/components/ui/item"
import { ContactCard } from "./contact.card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RoomDTO } from "@/api/chat/chat.dto"

// utils
import {
  format,
  isToday,
  isYesterday,
  isThisWeek,
} from "date-fns";
import { memo, useCallback, useEffect, useRef } from "react";
import { useChatStore } from "../store/store.chat";

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

export const ChatList = memo(({ contacts, HandleOpenChat, handleLoadMoreContacts }: ChatListProps) => {
  // referencias de la seccion del listado de contactos
  const downRefContacts = useRef<HTMLDivElement>(null);
  const wrapperContacts = useRef<HTMLDivElement>(null)

  //
  // Paginacion: al scrollear hacia elúltimo elemento se volvera a listar más elementos
  //
  useEffect(() => {
    const target = downRefContacts?.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleLoadMoreContacts()
        }
      },
      {
        root: wrapperContacts?.current,
        threshold: 0.1,
      }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [handleLoadMoreContacts]);

  return (<>
    <ScrollArea ref={wrapperContacts} className="h-full px-2 py-2">
      <div className="flex flex-col gap-4" >
        {contacts.map((item, index) => (
          <ContactCard
            handleOpenChat={HandleOpenChat}
            data={{
              id: item.id,
              lastMessage: item.lastMessage || 'No registramos mensajes',
              name: item.typeRoom == 'individual' ? item.participants[0].contactName : item.name,
              thumb: '',
              time: item.creationDate ? formatChatDate(item.creationDate) : ''
            }}
            key={index}
          />
        ))}
        <div ref={downRefContacts} ></div>
      </div>
    </ScrollArea>
  </>)
})