import { useCallback } from "react"
import { GetInvoices, GetInvoicesRequestDTO } from "./service.get-invoices"
import { GetSubscription, GetSubscriptionRequestDTO } from "./service.get-subscription"
import { toast } from "sonner"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type SubscriptionHookActionsProps = {

}

export const UseSubscriptionHookActions = ({ }: SubscriptionHookActionsProps) => {

  const GetSubcriptionAction = useCallback(async (data: GetSubscriptionRequestDTO) => {
    try {

      const req = await GetSubscription(data)
      if (!req) {
        toast.error('Error 1')
        return;
      }
  
      if (!req?.status) {
        toast.error(req.message || 'Error 2')
        return;
      }
  
      // success
      toast.success('Success')
    } catch (ex) {
  
    } finally {
  
    }
  }, [])

  const GetInvoicesAction = useCallback(async (data: GetInvoicesRequestDTO) => {
    try {

      const req = await GetInvoices(data)
      if (!req) {
        toast.error('Error 1')
        return;
      }
  
      if (!req?.status) {
        toast.error(req.message || 'Error 2')
        return;
      }
  
      // success
      toast.success('Success')
  
      
  
    } catch (ex) {
  
    } finally {
  
    }
  }, [])

  return {
    GetSubcriptionAction,
    GetInvoicesAction
  }
}