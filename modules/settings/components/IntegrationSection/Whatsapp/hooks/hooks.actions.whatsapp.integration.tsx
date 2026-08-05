import { useCallback } from "react"
import { toast } from "sonner"
import { useWhatsappIntegration } from "../store/store"
import { ListIntegrations } from "@/api/integration/integration.api"
import { useAppData } from "@/hooks/app/useAppData"
import { DeleteIntegrationItem, DeleteIntegrationItemRequestDTO } from "@/api/integration/delete.integration"
import { IntegrationCodes } from "@/configs/integration.codes"


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type WhatsappIntegrationHookActionsProps = {

}

export const UseWhatsappIntegrationHookActions = ({ }: WhatsappIntegrationHookActionsProps) => {
  const appData = useAppData()
  const store = useWhatsappIntegration()


  const DeleteIntegrationAction = useCallback(async (data: DeleteIntegrationItemRequestDTO) => {
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

  const ListWhatsappIntegrationsAction = useCallback(async () => {
    try {

      store.setList({ list: [], listing: true })

      const items = await ListIntegrations({ workspaceId: appData.workspace?.id || '', code: IntegrationCodes.whatsapp.code })
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
      toast.error('Error desconocido')
    } finally {
      store.setList({ listing: false })
    }
  }, [])

  return {
    DeleteIntegrationAction,
    ListWhatsappIntegrationsAction
  }
}