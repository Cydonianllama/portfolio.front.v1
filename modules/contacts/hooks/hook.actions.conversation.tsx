import { useChatStore } from "@/modules/chat/store/store.chat"
import { useCallback } from "react"
import { toast } from "sonner"
import { useContactStore } from "../store/store"
import { CreateChat } from "@/api/chat/chat.api"
import { CreateChatRequestDTO } from "@/api/chat/chat.dto"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ConversacionHookActionsProps = {

}

export const UseConversacionHookActions = ({ }: ConversacionHookActionsProps) => {
  const chatStore = useChatStore()
  const contactStore = useContactStore()

  const CreateConversationAction = useCallback(async (data: CreateChatRequestDTO) => {
    try {
      contactStore.setInfoCreationConvContact({ loading: true })
      console.log('CreateConversation - hook')
      const req = await CreateChat(data)

      if (!req) {
        toast.error('Error 1')
        return;
      }

      if (!req.status) {
        toast.error('Error 2')
        return;
      }

      toast.success('Conversación creada')

    } catch (error) {
      toast.error('Error inseperado')
    } finally {
      contactStore.setInfoCreationConvContact({ isOpen: false, loading: false })
    }
  }, [])

  return {
    CreateConversationAction
  }
}