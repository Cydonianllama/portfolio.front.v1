/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react"

import { useWorkspaceSelectionStore } from "@/modules/app/stores/workspaceStore"
import { useConversationFiltersActions } from "../../modules/chat/actions/useConversationFilters"
import { useChatActions } from "@/modules/chat/actions/useChatActions"

export const UseScreenChatAction = () => {

  const workspaceSelection = useWorkspaceSelectionStore()
  const chatAction = useChatActions()
  const conversationFilterActions = useConversationFiltersActions()
  
  const OnInit = useCallback(async () => {
    try {
      // . listar los filtros
      await conversationFilterActions.ListConversationFiltersAction({ page: 1, workspaceId: workspaceSelection.selectedWorkspaceId || '' })

      // . por defecto listar "todos los chats" (sin filtro)
      chatAction.ListChatsAction({ page: 1, workspaceId: workspaceSelection.selectedWorkspaceId || '' })
    } catch (error: any) {

    } finally {

    }
  }, [workspaceSelection.selectedWorkspaceId])
  
  return {
    OnInit
  }
}