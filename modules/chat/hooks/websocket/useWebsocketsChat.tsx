import { useChatStore } from "@/modules/chat/store/store.chat";
import { useSocket } from "../../../../hooks/useSocket";
import { useEffect } from "react";
import { useWorkspaceSelectionStore } from "@/modules/app/stores/workspaceStore";

export const UseWebsocketChat = () => {
  const chatStore = useChatStore()
  const workspaceSelectionStore = useWorkspaceSelectionStore()
  const socket = useSocket();

  //
  // Cuando cambia room hacemos conexion
  //
  useEffect(() => {
    if (chatStore.roomIdOpened) {
      // emitimos conexion con la room
      if (socket) {
        console.log('joining socket room : ', chatStore.roomIdOpened)
        socket.emit("join_room", chatStore.roomIdOpened);
      } else {
        console.log('socket not available to join room :', chatStore.roomIdOpened)
      }
    } else {
      // hacemos desconexion
    }
  }, [chatStore.roomIdOpened])

  return {

  }
}