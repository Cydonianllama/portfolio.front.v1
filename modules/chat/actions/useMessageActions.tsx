/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback } from 'react'
import { useChatStore } from '../store/store.chat'
import { ListMessages, SendMessage } from '@/api/chat/chat.api'
import { ListMessagesRequestDTO } from '@/api/chat/chat.dto'
import { toast } from 'sonner'

export const useMessageActions = () => {
  const chatStore = useChatStore()

  const SendMessageAction = useCallback(async (data: { roomId: string, message: string }) => {
    try {
      chatStore.setSendingMessageState({ sendingMessage: true, successSendingMessage: false })

      const req = await SendMessage({
        roomId: data.roomId,
        message: data.message
      })

      if (!req) {
        return;
      }

      if (!req.status) {
        return;
      }

      chatStore.setSendingMessageState({ successSendingMessage: true })

    } catch (error) {

    } finally {
      chatStore.setSendingMessageState({ sendingMessage: false })
    }
  }, [])

  const ListMessagesAction = useCallback(async (data: ListMessagesRequestDTO) => {
    try {
      // contactStore.setInfoCreationConvContact({ loading: true })
      const req = await ListMessages(data)

      if (!req) {
        toast.error('Error 1')
        return;
      }

      if (!req.status) {
        toast.error('Error 2')
        return;
      }

      // console.log([...chatStore.messages, ...req.data.list], chatStore.messages, req.data.list)

      chatStore.setChatSelectedStates({
        messages: [...req.data.list, ...chatStore.messages],
        paginationMessages: req.pagination
      })

    } catch (error) {
      toast.error('Error inseperado')
    } finally {

    }
  }, [chatStore.messages])

  const LoadMoreMessages = useCallback(() => {
    if (chatStore.listingMessages) {
      console.log("[INTERSECTION OBSERVER] not running is listing messages");
      return;
    }

    if (chatStore.openingChat) {
      console.log("[INTERSECTION OBSERVER] not running is opening chat");
      return;
    }

    let page = 1;

    if (chatStore.paginationMessages) {
      if (chatStore.paginationMessages.hasNextPage) {
        page = (chatStore?.paginationMessages?.page || 0) + 1;
      } else {
        console.log('No hay más paginas que listar')
        return;
      }
    }
    console.log("Cargar más mensajes");
    ListMessagesAction({ page: page, roomId: chatStore.roomIdOpened || '' })
  }, [chatStore.listingMessages, chatStore.openingChat, chatStore.paginationMessages, chatStore.roomIdOpened]);


  const ResetMessages = () => {
    chatStore.setChatSelectedStates({ messages: [], paginationMessages: null })
  }

  return {
    SendMessageAction,
    ListMessagesAction,
    LoadMoreMessages,
    ResetMessages
  }
}