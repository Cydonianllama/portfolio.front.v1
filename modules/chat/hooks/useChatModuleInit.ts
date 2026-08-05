import { useEffect } from "react"
import { useAppData } from "@/hooks/app/useAppData"
import { useChatActions } from "../actions/useChatActions"
import { useConversationFiltersActions } from "../actions/useConversationFilters"
import { useUtilitiesChatActions } from "../actions/useUtilitiesChat"

//
// Carga inicial del módulo cuando hay workspace seleccionado
//

export const useChatModuleInit = () => {
  const workspaceId = useAppData().workspace?.id || ''
  const chatActions = useChatActions()
  const conversationFilterActions = useConversationFiltersActions()
  const utilitiesChatActions = useUtilitiesChatActions({})

  useEffect(() => {
    if (!workspaceId) return

    conversationFilterActions.ListConversationFiltersAction({ page: 1, workspaceId })
    chatActions.ListChatsAction({ page: 1, workspaceId })

    // listado de etiquetas
    utilitiesChatActions.GetTagsAction({ page: 1, workspaceId })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId])
}
