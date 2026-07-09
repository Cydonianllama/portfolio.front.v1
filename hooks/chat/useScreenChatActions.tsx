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

      // 1. listar los filtros
      const filters = await conversationFilterActions.ListConversationFiltersAction({ page: 1 })

      console.log(filters)

      // 2. si hay filtros listar con el primer filtro
      if (filters?.data.list){
        if (filters?.data.list.length > 0){
          chatAction.ListChatsAction({ page: 1, workspaceId: workspaceSelection.selectedWorkspaceId || '', filter: filters?.data.list[0].id })
        }
      }else {
        // 3. si no hay filtros listar all default
        chatAction.ListChatsAction({ page: 1, workspaceId: workspaceSelection.selectedWorkspaceId || '' })
      }
    } catch (error: any) {

    } finally {

    }
  }, [workspaceSelection.selectedWorkspaceId])
  
  return {
    OnInit
  }
}