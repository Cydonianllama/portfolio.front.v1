import { useEffect } from "react";
import { socket } from "@/setup/socket";
import { UseChatActions } from "./chat/useChatActions";
import { useWorkspaceSelectionStore } from "@/modules/app/stores/workspaceStore";
import { useChatStore } from "@/modules/chat/store/store.chat";

export function useSocket() {

  const workspaceSelection = useWorkspaceSelectionStore()
  const chatStore = useChatStore()
  const chatActions = UseChatActions()

  useEffect(() => {
    console.log("useSocket hook called, socket connected:", socket.connected);
    if (!socket.connected) {
      try {
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
        socket.on("newMessage", chatActions.OnNewMessage);
      }
    }
  }, [chatStore.roomIdOpened, chatActions.OnNewMessage])

  return socket;
}