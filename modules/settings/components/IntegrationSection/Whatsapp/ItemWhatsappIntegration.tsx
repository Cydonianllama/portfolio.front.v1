import { useAppData } from "@/hooks/app/useAppData";
import { Button } from "@/components/ui/button"
import { UseWhatsappIntegrationHookActions } from "./hooks/hooks.actions.whatsapp.integration";
import { IntegrationDTO } from "@/api/integration/integration.dto";
import { useWhatsappIntegration } from "./store/store";
import { Spinner } from "@/components/ui/spinner";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ItemWhatsappIntegrationProps = {
  data: IntegrationDTO
}

export const ItemWhatsappIntegration = ({ data }: ItemWhatsappIntegrationProps) => {
  const useAppData = useAppData()
  const whatsappIntegrationActions = UseWhatsappIntegrationHookActions({})
  const store = useWhatsappIntegration()

  const HandleDelete = () => {
    whatsappIntegrationActions.DeleteIntegrationAction({ id: data.id, workspaceId: useAppData.workspace?.id || '' })
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