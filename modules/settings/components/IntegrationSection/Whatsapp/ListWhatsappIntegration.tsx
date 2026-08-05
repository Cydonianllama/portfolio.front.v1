//
// compo - api - store
//

import { useEffect } from "react";
import { useAppData } from "@/hooks/app/useAppData";
import { toast } from "sonner";
import { ListIntegrations } from "@/api/integration/integration.api";
import { useWhatsappIntegration } from "./store/store";
import { UseWhatsappIntegrationHookActions } from "./hooks/hooks.actions.whatsapp.integration";
import { ItemWhatsappIntegration } from "./ItemWhatsappIntegration";

// -------- a cambiar
// ComponentName
// ServiceName
// _NAME_STORE_
// ------------------

export const ListWhatsappIntegrations = () => {
  const store = useWhatsappIntegration()

  const appData = useAppData()

  const whatsappIntegrationActions = UseWhatsappIntegrationHookActions({})

  const OnInit = () => {
    whatsappIntegrationActions.ListWhatsappIntegrationsAction()
  }

  useEffect(() => {
    OnInit()
  }, [])

  return <>
    {store.list.map((el, index) => <ItemWhatsappIntegration data={el} key={index} />)}
  </>
}

