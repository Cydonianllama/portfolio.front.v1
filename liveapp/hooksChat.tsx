import { useCallback } from "react"
import { toast } from "sonner"
import { useContactStore } from '@/modules/contacts/store/store'
import { useChatStore } from "@/modules/chat/store/store.chat"
import { MessageDTO } from "@/api/chat/chat.dto"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ChatEventsHookActionsProps = {

}

export const UseChatEventsHookActions = ({ }: ChatEventsHookActionsProps) => {

  const chatStore = useChatStore()
  const contactStore = useContactStore()

  const OnMessageReceived = useCallback(async (data: { roomId: string, message: MessageDTO }) => {
    try{
      console.log("[socket] Nuevo mensaje:", { roomId: data.roomId, message: data.message });
      const roomId = data.roomId;
      const message = data.message;

      // validar si son el mismo roomId
      console.log({roomId, currentRoom: chatStore.roomIdOpened})
      if (roomId == chatStore.roomIdOpened){
        console.log('mismo room')
        // insertar nuevo mensaje
        const messages__ = [...chatStore.messages]
        chatStore.setChatSelectedStates({ messages: [...messages__, message] })
      }
    } catch (ex) {

    }
  }, [chatStore.listChats, chatStore.messages, chatStore.roomIdOpened, chatStore.setChatSelectedStates])

  const OnRoomCreated = useCallback(async () => {
    try {

    } catch (ex) {

    } finally {

    }
  }, [])

  const OnRoomDeleted = useCallback(async () => {
    try {

    } catch (ex) {

    } finally {

    }
  }, [])

  const OnRoomReaded = useCallback(async () => {
    try {

    } catch (ex) {

    } finally {

    }
  }, [])

  return {
    OnMessageReceived,
    OnRoomCreated,
    OnRoomDeleted,
    OnRoomReaded
  }
}