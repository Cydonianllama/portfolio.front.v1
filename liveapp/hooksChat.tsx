import { useCallback } from "react"
import { toast } from "sonner"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ChatEventsHookActionsProps = {

}

export const UseChatEventsHookActions = ({ }: ChatEventsHookActionsProps) => {

  const OnMessageReceived = useCallback(async () => {
    try {

    } catch (ex) {

    } finally {

    }
  }, [])

  const OnRoomCreated = useCallback(async () => {
    try {

    } catch (ex) {

    } finally {

    }
  }, [])

  const OnRoomDeleted = useCallback(async () => {
    try {

    } catch (ex) {

    } finally {

    }
  }, [])

  const OnRoomReaded = useCallback(async () => {
    try {

    } catch (ex) {

    } finally {

    }
  }, [])

  return {
    OnMessageReceived,
    OnRoomCreated,
    OnRoomDeleted,
    OnRoomReaded
  }
}