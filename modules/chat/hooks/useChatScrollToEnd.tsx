/* eslint-disable react-hooks/rules-of-hooks */
import { RefObject, useEffect } from "react";
import { useChatStore } from "../store/store.chat";

export const useScrollToEndChat = ({
  wrapperListMessagesRef
}:{
  wrapperListMessagesRef: RefObject<HTMLDivElement | null>
}) => {
  const chatStore = useChatStore()
  
  const scrollToEndChat = () => {
    requestAnimationFrame(() => {
      if (wrapperListMessagesRef.current) {
        wrapperListMessagesRef.current.scrollTo({
          top: wrapperListMessagesRef.current.scrollHeight,
          behavior: "instant",
        });
      }
    });
  }

  // cuando termina de listar los mensajes ()
  useEffect(() => {
    if (chatStore.successListingMessages) {
      // scrollToEndChat()
    }
  }, [chatStore.successListingMessages])

  // cuando termina de abrir el chat (scrollear al final)
  useEffect(() => {
    if (chatStore.hasSuccessOpeningChat) {
      console.log('terminó de abrir el chat - scrolear hacia abajo')
      scrollToEndChat()
    }
  }, [chatStore.hasSuccessOpeningChat])


}