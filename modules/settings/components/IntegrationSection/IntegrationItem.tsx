import { UseAppData } from "@/hooks/app/useAppData";
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { useWhatsappIntegration } from "./Whatsapp/store/store";
import { useTelegramIntegrations } from "./Telegram/store/store";
import { UseIntegrationHookActions } from "./hook.actions.integration";
import { IntegrationCodes } from "@/configs/integration.codes";



// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type IntegrationItemProps = {
  data: { code: string, title: string }
}

export const IntegrationItem = ({ data }: IntegrationItemProps) => {
  const useAppData = UseAppData()

  const whatsappStore = useWhatsappIntegration()
  const telegramStore = useTelegramIntegrations()
  const integrationActions = UseIntegrationHookActions({})

  return (
    <>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>{data.title}</ItemTitle>
          <ItemDescription>
            Acá irá la descripción de la integración.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button onClick={() => {
            if (data.code == IntegrationCodes.whatsapp.code) {
              whatsappStore.setOpenManage({ openManage: true })
            } else if (data.code == IntegrationCodes.telegram.code) {
              telegramStore.setOpenManage({ openManage: true })
            }
          }}>
            Administrar
          </Button>
          <Button
            onClick={() => {
              integrationActions.AddIngrationTestAction({
                workspaceId: useAppData.workspace?.id || '',
                code: data.code
              })
            }}
            variant="outline"
            size="sm"
          >
            test add
          </Button>
        </ItemActions>
      </Item>
    </>
  )
}