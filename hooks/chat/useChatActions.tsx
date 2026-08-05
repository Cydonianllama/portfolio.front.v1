/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback } from 'react'
import { useContactStore } from '@/modules/contacts/store/store'
import { useChatStore } from '../../modules/chat/store/store.chat'
import { CreateChat, ListChats, ListMessages, OpenChat, SendMessage, UpdateRoomVariables } from '@/api/chat/chat.api'
import { CreateChatRequestDTO, ListChatRequestDTO, ListMessagesRequestDTO, MessageDTO, UpdateRoomVariablesRequestDTO } from '@/api/chat/chat.dto'
import { toast } from 'sonner'
import { GetContactRequestDTO } from '@/api/contacts/contacts.dto'
import { GetContact } from '@/api/contacts/contacts.api'

export const UseChatActions = () => {

  const chatStore = useChatStore()
  const contactStore = useContactStore()

  const ListChatsAction = useCallback(async (data: ListChatRequestDTO) => {
    try {

      chatStore.setStates({ loadingChats: true, filter: data.filter })

      if (data.page == 1) {
        chatStore.setChats([])
        chatStore.setStates({ paginationChat: null })
      }

      const req = await ListChats({
        page: data.page,
        workspaceId: data.workspaceId,
        filter: data.filter
      })

      if (!req) {
        toast.error('Error 1')
        return;
      }

      if (!req.status) {
        toast.error('Error 2')
        return;
      }

      if (!req.data.list) {
        toast.error('Error 3')
        return;
      }

      // setting pagination
      chatStore.setStates({ paginationChat: req.pagination || null })

      // seting chats
      if (data.page > 1) {
        chatStore.setChats([...chatStore.listChats, ...req.data.list])
      } else {
        chatStore.setChats([...req.data.list])
      }

    } catch (error) {
      toast.error('Error inesperado (ListChatsAction)')
    } finally {
      chatStore.setStates({ loadingChats: false })
    }
  }, [chatStore.listChats])

  const OpenChatAction = useCallback(async (data: { roomId: string }) => {
    try {

      chatStore.setChatSelectedStates({ openingChat: true, hasSuccessOpeningChat: false, messages: [] })

      const req = await OpenChat({
        roomId: data.roomId
      })

      if (!req) {
        return;
      }

      if (!req.status) {
        return;
      }

      chatStore.setChatSelectedStates({
        roomIdOpened: data.roomId,
        messages: req.data.messages,
        paginationMessages: req.data.paginationMessage,
        hasSuccessOpeningChat: true,
      })

      // cargar variables de la room
      chatStore.setRoomVariables(req.data.room?.variables || [])

      // room de un participante
      if (req.data.room?.typeRoom == 'individual') {
        chatStore.setIndividualContact({ contactIndividualOpenedInformation: req.data?.contact })
      }

    } catch (error) {

    } finally {
      chatStore.setChatSelectedStates({ openingChat: false })
    }
  }, [])

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

  const ListContactInformation = useCallback(async (data: GetContactRequestDTO) => {
    try {
      const req = await GetContact(data)

      if (!req) {
        toast.error('Error 1')
        return;
      }

      if (!req.status) {
        toast.error('Error 2')
        return;
      }

      if (req.data?.contact) {
        chatStore.setIndividualContact({ contactIndividualOpenedInformation: req.data?.contact })
      }

    } catch (error) {
      toast.error('Error inseperado')
    } finally {

    }
  }, [chatStore.messages])

  const UpdateRoomVariablesAction = useCallback(async (data: UpdateRoomVariablesRequestDTO) => {
    try {
      const req = await UpdateRoomVariables(data)

      if (!req) {
        toast.error('Error al actualizar variables')
        return;
      }

      if (!req.status) {
        toast.error('Error al actualizar variables')
        return;
      }

      if (req.data?.room) {
        chatStore.setRoomVariables(req.data.room.variables || [])
        toast.success('Variables actualizadas')
      }

    } catch (error) {
      toast.error('Error inesperado (UpdateRoomVariablesAction)')
    } finally {

    }
  }, [])

  return {
    ListChatsAction,
    OpenChatAction,
    SendMessageAction,
    ListMessagesAction,
    ListContactInformation,
    UpdateRoomVariablesAction,
  }
}