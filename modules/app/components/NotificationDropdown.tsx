import { UseAppData } from "@/hooks/app/useAppData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FaRegBell } from "react-icons/fa6";
import { UseNotificationHookActions } from "../hooks/notification.actions.hook";
import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type NotificationDropdownProps = {

}

export const NotificationDropdown = ({ }: NotificationDropdownProps) => {
  const notificationHooksAction = UseNotificationHookActions({})
  const useAppData = UseAppData()

  useEffect(() => {
    if (useAppData.user?.id) {
      notificationHooksAction.GetNotificationsAction({ userId: useAppData.user?.id })
    }
  }, [useAppData.user])

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <FaRegBell />
        </PopoverTrigger>
        <PopoverContent>
          Acá irían las notificaciones
        </PopoverContent>
      </Popover>
    </>
  )
}