/* eslint-disable react/display-name */
import { MessageDTO } from "@/api/chat/chat.dto"
import { ChatMessage } from "./chat.message"
import { memo, RefObject, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  format,
} from "date-fns";
import { ID_REFERENCE_TOP_LIST_MESSAGES_SECTION } from "../config";

type MessagesShowcaseProps = {
  messages: MessageDTO[]
  loading: boolean;
  topRef: RefObject<HTMLDivElement | null>;
  wrapperListMessagesRef: RefObject<HTMLDivElement | null>;
}

export const MessagesShowcase = memo(({ messages, topRef, wrapperListMessagesRef }: MessagesShowcaseProps) => {
  return (<>
    <div ref={wrapperListMessagesRef} className='flex flex-col min-h-0 gap-5 py-2 flex-1 overflow-auto '>
      <div id={ID_REFERENCE_TOP_LIST_MESSAGES_SECTION} ref={topRef} />
      {messages.map((el, index) => <ChatMessage
        key={index}
        type="me"
        data={{
          id: el.id,
          content: el.message,
          date: format(el.creationDate, "HH:mm")
        }}
      />)}
    </div>
  </>)
})