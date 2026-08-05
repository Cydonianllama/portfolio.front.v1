import { useEffect } from "react"
import { ChatStore } from "../../store/store.chat"

export const useTextareaResetter = (
  resetCallback: () => void,
  chatStore: ChatStore // o tu tipo de store
) => {
  useEffect(() => {
    if (!chatStore.sendingMessage && chatStore.successSendingMessage) {
      resetCallback()
    }
  }, [chatStore.sendingMessage, chatStore.successSendingMessage, resetCallback])

  useEffect(() => {
    if (chatStore.roomIdOpened) {
      resetCallback()
    }
  }, [chatStore.roomIdOpened, resetCallback])
}