/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback } from 'react'
import { useChatStore } from '../store/store.chat'
import { chatUtilitiesStore } from '../store/store.utilities'
import { ListChats, OpenChat, UpdateRoomVariables } from '@/api/chat/chat.api'
import { ListChatRequestDTO, UpdateRoomVariablesRequestDTO } from '@/api/chat/chat.dto'
import { toast } from 'sonner'
import { GetContactRequestDTO } from '@/api/contacts/contacts.dto'
import { GetContact } from '@/api/contacts/contacts.api'
import { useWorkspaceSelectionStore } from '@/modules/app/stores/workspaceStore'

export type useChatActionsType = {
  ListChatsAction: (data: ListChatRequestDTO) => Promise<void>;
  OpenChatAction: (data: {
    roomId: string;
  }) => Promise<void>;
  ListContactInformation: (data: GetContactRequestDTO) => Promise<void>;
  UpdateRoomVariablesAction: (data: UpdateRoomVariablesRequestDTO) => Promise<void>;
  LoadMoreChats: () => void;
  ResetChat: () => void;
}

export const useChatActions = (): useChatActionsType => {
  const workspaceSelectionStore = useWorkspaceSelectionStore()

  const chatStore = useChatStore()
  const chatUtilities = chatUtilitiesStore()

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
      const participant = req.data.room?.participants.length ? req.data.room?.participants[0] || null : null

      if (participant) {
        chatStore.setRoomVariables(participant?.variablesCopy?.map((el) => ({
          codeVariable: el.codeVariable || '',
          value: el.value || '',
          addedAt: new Date(),
          updatedAt: new Date()
        })) || [])

        // cargar etiquetas de la room
        chatUtilities.setRoomTags(participant?.tagsCopy?.map((el) => ({
          id: el.id || '',
          name: '',
          color: '',
          index: 0
        })) || [])
      }

      // room de un participante
      if (req.data.room?.typeRoom == 'individual') {
        chatStore.setIndividualContact({ contactIndividualOpenedInformation: req.data?.contact })
      }

    } catch (error) {

    } finally {
      chatStore.setChatSelectedStates({ openingChat: false })
    }
  }, [])

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
        // cargar variables de la room
        const participant = req.data.room?.participants.length ? req.data.room?.participants[0] || null : null

        if (participant) {
          chatStore.setRoomVariables(participant?.variablesCopy?.map((el) => ({
            codeVariable: el.codeVariable || '',
            value: el.value || '',
            addedAt: new Date(),
            updatedAt: new Date()
          })) || [])
          toast.success('Variables actualizadas')
        }
      }


    } catch (error) {
      toast.error('Error inesperado (UpdateRoomVariablesAction)')
    } finally {

    }
  }, [])

  // Listar más contactos
  const LoadMoreChats = useCallback(() => {
    if (chatStore.loadingChats) {
      console.log("[INTERSECTION OBSERVER] not running is listing rooms");
      return;
    }

    let page = 1;

    if (chatStore.paginationChat) {
      if (chatStore.paginationChat.hasNextPage) {
        page = (chatStore?.paginationChat?.page || 0) + 1;
      } else {
        console.log('No hay más paginas que listar')
        return;
      }
    }
    console.log("Cargar más rooms", { page: page, workspaceId: workspaceSelectionStore.selectedWorkspaceId || '' });
    ListChatsAction({ page: page, workspaceId: workspaceSelectionStore.selectedWorkspaceId || '' })
  }, [chatStore.loadingChats, chatStore.paginationChat]);


  const ResetChat = () => {
    chatStore.setStates({ paginationChat: null })
  }

  return {
    ListChatsAction,
    OpenChatAction,
    ListContactInformation,
    UpdateRoomVariablesAction,
    LoadMoreChats,
    ResetChat
  }
}