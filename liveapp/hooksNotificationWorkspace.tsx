import { NotificationDTO } from "@/api/notification/dto"
import { useNotification } from "@/modules/app/stores/notificationStore"
import { useCallback } from "react"
import { toast } from "sonner"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type NotificationWorkspacesHookActionsProps = {

}

export const UseNotificationWorkspacesHookActions = ({ }: NotificationWorkspacesHookActionsProps) => {
  const notificationStore = useNotification()
  //
  // Notifcations
  //

  const OnWorkspaceNotificationReceived = useCallback(async ({ notification, workspaceId }: { notification: NotificationDTO, workspaceId: string }) => {
    try {
      console.log(`[socket] OnWorkspaceNotificationReceived from workspace ${workspaceId}`)
      notificationStore.setState({ hasNewNotifications: true })
      notificationStore.setListState({ list: [notification, ...notificationStore.list] })
    } catch (ex) {

    } finally {

    }
  }, [notificationStore.list])

  return {
    OnWorkspaceNotificationReceived
  }
}