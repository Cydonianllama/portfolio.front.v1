import { useAppData } from "@/hooks/app/useAppData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FaRegBell } from "react-icons/fa6";
import { UseNotificationHookActions } from "../hooks/notification.actions.hook";
import { useEffect } from "react";
import { useNotification } from "../stores/notificationStore";
import { NotificationItem } from "./NotificationItem";
import { Button } from "@/components/ui/button"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type NotificationDropdownProps = {

}

export const NotificationDropdown = ({ }: NotificationDropdownProps) => {
  const notificationHooksAction = UseNotificationHookActions({})
  const notificationStore = useNotification()
  const useAppData = useAppData()

  useEffect(() => {
    if (useAppData.user?.id) {
      notificationHooksAction.GetNotificationsAction({ userId: useAppData.user?.id })
    }
  }, [useAppData.user])

  return (
    <>
      <Popover>
        <PopoverTrigger render={(
          <Button className={'relative'} variant={'ghost'} size={'icon-sm'} onClick={() => { notificationStore.setState({ hasNewNotifications: false }) }}>
            <FaRegBell />
            {notificationStore.hasNewNotifications && (
              <span className="absolute right-0 top-0 flex size-2.5">
                {/* Pulso */}
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />

                {/* Punto */}
                <span className="relative inline-flex size-2.5 rounded-full bg-red-500" />
              </span>
            )}
          </Button>
        )}>

        </PopoverTrigger>
        <PopoverContent align="end" side="left" className={'p-0 w-70'}>
          <div>
            <div className="py-2 border-b px-2 flex items-center justify-between">
              <h2 className="text-md font-semibold block">Notificaciones</h2>
              <Button className={''} variant={'link'} size={'xs'}>Marcar como leído</Button>
            </div>
            <div className="bg-gray-100  border-b px-2 py-2 text-xs">
              Hoy
            </div>
            <div className="max-h-70 overflow-auto">
              {notificationStore.list.map((el, index) => (<NotificationItem data={el} key={index} />))}
            </div>
            <div className="px-2 py-2">
              <Button size={'xs'} className={'w-full'} variant={'link'}>Ver todos</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}