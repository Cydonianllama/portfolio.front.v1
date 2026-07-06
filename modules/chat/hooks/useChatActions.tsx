import { useCallback } from 'react'
import { useChatStore } from '../store/store.chat'
import { CreateChat, ListChats, OpenChat, SendMessage } from '@/api/chat/chat.api'
import { CreateChatRequestDTO } from '@/api/chat/chat.dto'

export const UseChatActions = () => {

  const chatStore = useChatStore()

  const ListChatsAction = useCallback(async (page: number) => {
    try {

      if (page == 1) {
        chatStore.setChats([])
      }

      const req = await ListChats({
        page: page
      })

      if (!req) {
        return;
      }

      if (!req.status) {
        return;
      }

      if (!req.data.list) {
        return;
      }

      if (page > 1) {
        chatStore.setChats([...chatStore.listChats, ...req.data.list])
      }

    } catch (error) {

    }
  }, [])

  const OpenChatAction = useCallback(async (data: { roomId: string }) => {
    try {
      const req = await OpenChat({
        roomId: data.roomId
      })

      if (!req) {
        return;
      }

      if (!req.status) {
        return;
      }

    } catch (error) {

    }
  }, [])

  const SendMessageAction = useCallback(async (data: { roomId: string, message: string }) => {
    try {
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

    } catch (error) {

    }
  }, [])

  const CreateConversation = useCallback(async (data: CreateChatRequestDTO) => {
    try {
      console.log('CreateConversation - hook')
      const req = await CreateChat(data)

      if (!req) {
        return;
      }

      if (!req.status) {
        return;
      }

    } catch (error) {

    }
  }, [])


  return {
    ListChatsAction,
    OpenChatAction,
    SendMessageAction,
    CreateConversation
  }
}