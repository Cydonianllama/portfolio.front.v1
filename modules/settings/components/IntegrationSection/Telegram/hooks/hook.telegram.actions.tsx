import { ListIntegrations } from "@/api/integration/integration.api"
import { UseAppData } from "@/hooks/app/useAppData"
import { useCallback } from "react"
import { toast } from "sonner"
import { useTelegramIntegrations } from "../store/store"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TelgramIntegrationsHookActionsProps = {

}

export const UseTelgramIntegrationsHookActions = ({ }: TelgramIntegrationsHookActionsProps) => {
  const store = useTelegramIntegrations()
  const useAppData = UseAppData()
  
  const GetIntegrationsTelegramAction = useCallback(async () => {

    

    try {
      const items = await ListIntegrations({ workspaceId: useAppData.workspace?.id || '', code: 'telegram' })
      if (!items?.status) {
        toast.error('[Error 1]')
        return;
      }

      if (!items?.data) {
        toast.error('[Error 2]')
        return;
      }

      store.setList({ list: items.data.list, pagination: items.pagination })
    } catch (ex) {

    } finally {

    }
  }, [])

  return {
    GetIntegrationsTelegramAction
  }
}