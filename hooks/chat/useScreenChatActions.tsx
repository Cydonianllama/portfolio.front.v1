/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react"
import { UseChatActions } from "./useChatActions"
import { UseConversationFilters } from "./useConversationFilters"
import { useWorkspaceSelectionStore } from "@/modules/app/stores/workspaceStore"

export const UseScreenChatAction = () => {

  const workspaceSelection = useWorkspaceSelectionStore()
  const chatAction = UseChatActions()
  const conversationFilterActions = UseConversationFilters()
  
  const OnInit = useCallback(async () => {
    try {
      // . listar los filtros
      const filters = await conversationFilterActions.ListConversationFiltersAction({ page: 1, workspaceId: workspaceSelection.selectedWorkspaceId || '' })

      // . si no hay filtros listar all default
      if (!filters?.data.list || filters?.data.list.length == 0){
        chatAction.ListChatsAction({ page: 1, workspaceId: workspaceSelection.selectedWorkspaceId || '' })
      }

      // . si hay filtros listar con el primer filtro
      if (filters?.data.list){
        if (filters?.data.list.length > 0){
          chatAction.ListChatsAction({ page: 1, workspaceId: workspaceSelection.selectedWorkspaceId || '', filter: filters?.data.list[0].id })
        }
      }
    } catch (error: any) {

    } finally {

    }
  }, [workspaceSelection.selectedWorkspaceId])
  
  return {
    OnInit
  }
}