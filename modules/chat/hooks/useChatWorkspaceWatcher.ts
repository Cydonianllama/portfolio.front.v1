import { useEffect } from "react"
import { useAppData } from "@/hooks/app/useAppData"
import { useChatStore } from "../store/store.chat"
import { useChatActions } from "../actions/useChatActions"
import { useMessageActions } from "../actions/useMessageActions"
import { useChatManagerActions } from "../actions/useChatManagerActions"

//
// Reacciona a los cambios de workspace: resetea el estado del chat.
// El listado del nuevo workspace lo maneja useChatModuleInit.
//

export const useChatWorkspaceWatcher = ({ reset }: { reset: () => void }) => {
  const workspaceId = useAppData().workspace?.id || ''
  const chatStore = useChatStore()
  const chatActions = useChatActions()
  const messageActions = useMessageActions()
  const chatManagerActions = useChatManagerActions(chatStore)

  useEffect(() => {
    if (!workspaceId) return

    chatActions.ResetChat()
    messageActions.ResetMessages()
    reset()
    chatManagerActions.resetChatManager()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId])
}
