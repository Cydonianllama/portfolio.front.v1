import { ListIntegrations } from "@/api/integration/integration.api"
import { useAppData } from "@/hooks/app/useAppData"
import { useCallback } from "react"
import { toast } from "sonner"
import { useTelegramIntegrations } from "../store/store"
import { DeleteIntegrationItem, DeleteIntegrationItemRequestDTO } from "@/api/integration/delete.integration"
import { IntegrationCodes } from "@/configs/integration.codes"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TelgramIntegrationsHookActionsProps = {

}

export const UseTelgramIntegrationsHookActions = ({ }: TelgramIntegrationsHookActionsProps) => {
  const store = useTelegramIntegrations()
  const appData = useAppData()

  const GetIntegrationsTelegramAction = useCallback(async () => {

    try {
      const items = await ListIntegrations({ workspaceId: appData.workspace?.id || '', code: IntegrationCodes.telegram.code })
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


  const DeleteTelgramIntegrationAction = useCallback(async (data: DeleteIntegrationItemRequestDTO) => {
    try {
      store.setDeleteState({ deleting: true })
      const req = await DeleteIntegrationItem(data)

      if (!req?.status) {
        toast.error(req?.message || '[Error 1]')
        return;
      }

      toast.success('Eliminado')

    } catch (ex) {

    } finally {
      store.setDeleteState({ deleting: false })
    }
  }, [])

  return {
    GetIntegrationsTelegramAction,
    DeleteTelgramIntegrationAction,
  }
}