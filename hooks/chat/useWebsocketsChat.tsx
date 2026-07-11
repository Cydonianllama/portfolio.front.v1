import { useChatStore } from "@/modules/chat/store/store.chat";
import { useSocket } from "../useSocket";
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

  // //
  // // Realizar la primera conexion
  // //
  // useEffect(() => {
  //   console.log("setting up socket listeners")

  //   if (workspaceSelectionStore.selectedWorkspaceId) {
  //     if (socket) {
  //       socket.on("newMessage", (data) => {
  //         console.log("[socket] Nuevo mensaje:", { roomId: data.roomId, message: data.message });
  //         // // validamos que el mensaje recibido por socket corresponde al contacto actualmente seleccionado
  //         // if (data.contactId === selectedContactId) {
  //         //   // si es así, lo agregamos al listado de mensajes para mostrarlo en la UI
  //         //   if (data.message) setMessages((prev) => [...prev, data.message]);
  //         //   else console.log("[socket] El mensaje recibido no tiene formato esperado:", data)
  //         // } else {
  //         //   //console.log("[socket] El mensaje recibido no corresponde al contacto seleccionado, no se actualizará la UI")
  //         // }
  //       });
  //     }
  //   }

  //   return () => {
  //     console.log("[socket] Reseteando socket")
  //     socket.off("newMessage");
  //   };
  // }, [socket, workspaceSelectionStore.selectedWorkspaceId]);

  return {

  }
}