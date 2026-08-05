import { useCallback } from "react"
import { toast } from "sonner"
import { UseNotificationWorkspacesHookActions } from "./hooksNotificationWorkspace"
import { UseNotificationGeneralHookActions } from "./hooksNotificationGeneral"
import { UseGlobalNotificationsHookActions } from "./hooksGlobal"
import { UseChatEventsHookActions } from "./hooksChat"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type EventsHookActionsProps = {

}

export const useEventsHookActions = ({ }: EventsHookActionsProps) => {
  const { OnWorkspaceNotificationReceived } = UseNotificationWorkspacesHookActions({})
  const { OnGeneralNotificationReceived } = UseNotificationGeneralHookActions({})
  const { OnGlobalMessageNotificationReceived } = UseGlobalNotificationsHookActions({})
  const {
    OnMessageReceived,
    OnRoomCreated,
    OnRoomDeleted,
    OnRoomReaded,
  } = UseChatEventsHookActions({})

  return {
    // workspace
    OnWorkspaceNotificationReceived,
    // user
    OnGeneralNotificationReceived,
    // global
    OnGlobalMessageNotificationReceived,
    // chat
    OnMessageReceived,
    OnRoomCreated,
    OnRoomDeleted,
    OnRoomReaded,
  }
}