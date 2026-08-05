import { IntegrationDTO } from "@/api/integration/integration.dto";
import { useAppData } from "@/hooks/app/useAppData";
import { Button } from "@/components/ui/button"
import { UseTelgramIntegrationsHookActions } from "./hooks/hook.telegram.actions";
import { useTelegramIntegrations } from "./store/store";
import { Spinner } from "@/components/ui/spinner";

type TelegramItemProps = {
  data: IntegrationDTO
}

export const TelegramItem = ({ data }: TelegramItemProps) => {
  const useAppData = useAppData()
  const telegramActions = UseTelgramIntegrationsHookActions({})
  const store = useTelegramIntegrations()

  const HandleDelete = () => {
    try {
      telegramActions.DeleteTelgramIntegrationAction({ id: data.id, workspaceId: useAppData.workspace?.id || '' })
    } catch (error) {
      
    }
  }

  return (
    <>
      {data.alias}
      <div>
        <Button disabled={store.deleting ? true : false} onClick={HandleDelete}>
          {store.deleting && <Spinner data-icon="inline-start" />}
          Eliminar
        </Button>
      </div>
    </>
  )
}