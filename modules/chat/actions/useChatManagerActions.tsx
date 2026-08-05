import { ChatStore } from "../store/store.chat"

export const useChatManagerActions = (chatStore: ChatStore) => {

  const resetChatManager = () => {
    chatStore.setIndividualContact({ contactIndividualOpenedInformation: null })
    chatStore.setChatSelectedStates({ roomIdOpened: null })
  }

  return {
    resetChatManager
  }
}