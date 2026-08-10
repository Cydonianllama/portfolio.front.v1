import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import axios from "axios"
import { useEffect, useState } from "react"
import { api } from '@/setup/axios'
import { UseIntegrationHookActions } from "./hook.actions.integration"
import { useAppData } from "@/hooks/app/useAppData";
import { useWhatsappIntegration } from "./Whatsapp/store/store"
import { DialogWhatsappIntegration } from "./Whatsapp/DialogManageWhatsapp"
import { useTelegramIntegrations } from "./Telegram/store/store"
import { DialogManageTelegram } from "./Telegram/DialogManageTelegram"
import { IntegrationItem } from "./IntegrationItem"

export const IntegrationSection = () => {
  const whatsappStore = useWhatsappIntegration()
  const telegramStore = useTelegramIntegrations()
  const appData = useAppData()
  const integrationActions = UseIntegrationHookActions({})

  const [integrationsJson, setIntegrationsJson] = useState<Array<{ code: string, title: string, description: string }>>([])

  const GetListIntegrationsFile = async () => {
    console.log('GetListIntegrationsFile')
    try {
      const reqFile = await api.get(`/static/integrations.json`)
      console.log(reqFile.data)
      setIntegrationsJson(reqFile.data)
    } catch (ex) {

    }
  }

  useEffect(() => {
    GetListIntegrationsFile()
  }, [])

  return (<>
    <div className="space-y-2 flex flex-col">
      {integrationsJson.map((el, index) => (<IntegrationItem key={index} data={el} />))}
    </div>
    <DialogWhatsappIntegration />
    <DialogManageTelegram />
  </>)
}