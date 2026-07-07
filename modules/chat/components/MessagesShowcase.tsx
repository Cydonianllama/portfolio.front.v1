/* eslint-disable react/display-name */
import { MessageDTO } from "@/api/chat/chat.dto"
import { ChatMessage } from "./chat.message"
import { memo, RefObject, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"

type MessagesShowcaseProps = {
  messages: MessageDTO[]
  loading: boolean;
  handleLoadMore: () => void;
  topRef: RefObject<HTMLDivElement | null>;
  wrapperListMessagesRef: RefObject<HTMLDivElement | null>;
}

export const MessagesShowcase = memo(({ messages, handleLoadMore, topRef, wrapperListMessagesRef }: MessagesShowcaseProps) => {

  //
  // Paginacion: al scrollear hacia elúltimo elemento se volvera a listar más elementos
  //
  useEffect(() => {
    const target = topRef?.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleLoadMore()
        }
      },
      {
        root: wrapperListMessagesRef?.current,
        threshold: 0.1,
      }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [handleLoadMore, topRef, wrapperListMessagesRef]);

  return (<>
    <div ref={wrapperListMessagesRef} className='flex flex-col min-h-0 gap-5 py-2 flex-1 overflow-auto '>
      <div ref={topRef} />
      {messages.map((el, index) => <ChatMessage key={index} type="me" data={{ content: el.message, id: el.id }} />)}
    </div>
  </>)
})