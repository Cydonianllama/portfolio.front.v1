import { useEffect } from "react";
import { socket } from "@/setup/socket";
import { useChatStore } from "@/modules/chat/store/store.chat";
import { UseEventsHookActions } from "@/liveapp/hooksEventsAction";
import { EVENT_CHAT_NEW_MESSAGE, EVENT_NEW_USER_NOTIFICATION, EVENT_NEW_WORKSPACE_NOTIFICATION } from "@/liveapp/constants";
import { useAppData } from "@/hooks/app/useAppData";

export function useSocket() {
  const chatStore = useChatStore()
  const liveEvents = UseEventsHookActions({})
  const useAppData = useAppData()

  useEffect(() => {
    console.log("useSocket hook called, socket connected:", socket.connected);
    if (!socket.connected) {
      try {
        console.log('connecting')
        socket.connect();
      } catch (ex) {
        console.error("Error connecting to socket:", ex);
      }
    }

    return () => {
      socket.disconnect();
    };
  }, []);
  
  useEffect(() => {
    if (chatStore.roomIdOpened) {
      if (socket) {
        console.log(`instanace of [${EVENT_CHAT_NEW_MESSAGE}]`)
        console.log(`instanace of [${EVENT_NEW_USER_NOTIFICATION}]`)
        console.log(`instanace of [${EVENT_NEW_WORKSPACE_NOTIFICATION }]`)
        socket.on(EVENT_CHAT_NEW_MESSAGE, liveEvents.OnMessageReceived);
        socket.on(EVENT_NEW_USER_NOTIFICATION, liveEvents.OnGeneralNotificationReceived);
        socket.on(EVENT_NEW_WORKSPACE_NOTIFICATION, liveEvents.OnWorkspaceNotificationReceived);
      }
    }
  }, [chatStore.roomIdOpened, liveEvents.OnMessageReceived])

  useEffect(() => {
    if (useAppData.workspace){
      if (socket) {
        console.log(`instanace of [${EVENT_NEW_WORKSPACE_NOTIFICATION}]`)
        socket.on(EVENT_NEW_WORKSPACE_NOTIFICATION, liveEvents.OnWorkspaceNotificationReceived);
      }
    }
  }, [useAppData.workspace])

  return socket;
}