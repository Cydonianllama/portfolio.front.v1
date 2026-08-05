import { useEffect } from "react"
import { ShowcaseInvoices } from "./showcaseInvoices"
import {
  ShowcaseSubscription
} from "./showcaseSubscription"
import { UseSubscriptionHookActions } from "./hooks.action.subscriptions"
import { useAppData } from "@/hooks/app/useAppData";

export const SubscriptionSection = () => {
  const useAppData = useAppData()
  const subscipritonActions = UseSubscriptionHookActions({})

  const OnInit = async () => {
    subscipritonActions.GetInvoicesAction({ workspaceId: useAppData.workspace?.id || '', page: 1 })
    subscipritonActions.GetSubcriptionAction({ workspaceId: useAppData.workspace?.id || '' })
  }

  useEffect(() => {
    if (useAppData.workspace) {
      OnInit()
    }
  }, [useAppData])

  return (<>
    <div className="flex flex-col gap-2">
      <div>
        <ShowcaseSubscription />
      </div>
      <div>
        <ShowcaseInvoices />
      </div>
    </div>
  </>)
}
