import { useCallback } from 'react'
import { useChatStore } from '../store/store.chat'
import { ListChats } from '../services/list.chat'
import { OpenChat } from '../services/open.chat'
import { SendMessage } from '../services/send.messaage'

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


  return {
    ListChatsAction,
    OpenChatAction,
    SendMessageAction
  }
}