/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react"
import { UseChatActions } from "./useChatActions"

import { useWorkspaceSelectionStore } from "@/modules/app/stores/workspaceStore"
import { UseConversationFiltersActions } from "./useConversationFilters"

export const UseScreenChatAction = () => {

  const workspaceSelection = useWorkspaceSelectionStore()
  const chatAction = UseChatActions()
  const conversationFilterActions = UseConversationFiltersActions()
  
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