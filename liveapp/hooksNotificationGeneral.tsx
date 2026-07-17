import { useCallback } from "react"
import { toast } from "sonner"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type NotificationGeneralHookActionsProps = {

}

export const UseNotificationGeneralHookActions = ({} : NotificationGeneralHookActionsProps) => {

  const OnGeneralNotificationReceived = useCallback(async () => {
    try {
      
    } catch (ex) {

    } finally {
      
    }
  }, [])

  return {
    OnGeneralNotificationReceived
  }
}