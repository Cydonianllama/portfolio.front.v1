import { useEffect } from "react"
import { useChatStore } from "../store/store.chat"
import { socket } from "@/setup/socket"

//
// Suscripciones a eventos de ciclo de vida del módulo.
// Por ahora: conexión al websocket de la room abierta.
//

export const useChatEvents = () => {
  const chatStore = useChatStore()

  useEffect(() => {
    if (!chatStore.roomIdOpened) return

    socket.emit("join_room", chatStore.roomIdOpened)
  }, [chatStore.roomIdOpened])
}
