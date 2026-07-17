import { useCallback } from "react"
import { toast } from "sonner"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type NotificationWorkspacesHookActionsProps = {

}

export const UseNotificationWorkspacesHookActions = ({ }: NotificationWorkspacesHookActionsProps) => {

  //
  // Notifcations
  //

  const OnWorkspaceNotificationReceived = useCallback(async () => {
    try {

    } catch (ex) {

    } finally {

    }
  }, [])

  return {
    OnWorkspaceNotificationReceived
  }
}