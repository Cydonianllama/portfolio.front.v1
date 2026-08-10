import { ListNotifications, ListNotificationsRequestDTO } from "@/api/notification/list.notifications"
import { useCallback } from "react"
import { toast } from "sonner"
import { useNotification } from "../stores/notificationStore"

type NotificationHookActionsProps = {}

export const UseNotificationHookActions = ({} : NotificationHookActionsProps) => {

  const notificationStore = useNotification()

  const GetNotificationsAction = useCallback(async (data: ListNotificationsRequestDTO) => {
    try {
      notificationStore.setListState({ listing: true })
      const req = await ListNotifications(data)
      if (!req) {
        toast.error('Error 1')
        return;
      }
  
      if (!req?.status) {
        toast.error(req.message || 'Error 2')
        return;
      }
  
      // success
      notificationStore.setListState({ list: req.data.list, pagination: req.pagination })
      // toast.success('Success')
      
    } catch (ex) {
  
    } finally {
      notificationStore.setListState({ listing: true })
    }
  }, [])

  return {
    GetNotificationsAction
  }
}