import { useCallback } from "react"
import { toast } from "sonner"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type GlobalNotificationsHookActionsProps = {

}

export const UseGlobalNotificationsHookActions = ({} : GlobalNotificationsHookActionsProps) => {

  const OnGlobalMessageNotificationReceived = useCallback(async () => {
    try {
      
    } catch (ex) {

    } finally {
      
    }
  }, [])

  return {
    OnGlobalMessageNotificationReceived
  }
}