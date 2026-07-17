'use client'

import { PropsWithChildren, useEffect } from 'react'
import { useChatStore } from '@/modules/chat/store/store.chat';
import { useSocket } from '@/hooks/useSocket';
import { UseAppData } from "@/hooks/app/useAppData";
import { JOIN_CHAT_ROOM, JOIN_GENERAL_ROOM, JOIN_WORKSPACE_ROOM } from './constants';

export const LiveAppProvider = ({ children }: PropsWithChildren) => {
  const socket = useSocket();
  const chatStore = useChatStore()
  const useAppData = UseAppData()

  //
  // Cuando cambia room hacemos conexion
  //
  useEffect(() => {
    if (chatStore.roomIdOpened) {
      // emitimos conexion con la room
      if (socket) {
        console.log('joining socket room : ', chatStore.roomIdOpened)
        socket.emit(JOIN_CHAT_ROOM, chatStore.roomIdOpened);
      } else {
        console.log('socket not available to join room :', chatStore.roomIdOpened)
      }
    } else {
      // hacemos desconexion
    }
  }, [chatStore.roomIdOpened])

  //
  // para los eventos de workspace
  //
  useEffect(() => {
    if (useAppData.workspace) {
      if (socket) {
        console.log('joining workspace room : ', useAppData.workspace.id)
        socket.emit(JOIN_WORKSPACE_ROOM, useAppData.workspace.id);
      } else {
        console.log('socket not available to join workspace room : ', useAppData.workspace.id)
      }
    }
  }, [useAppData.workspace])

  //
  // para los eventos del usuario
  //
  useEffect(() => {
    if (useAppData.user?.id) {
      if (socket) {
        console.log('joining general room : ', useAppData.user.id)
        socket.emit(JOIN_GENERAL_ROOM, useAppData.user.id);
      } else {
        console.log('socket not available to join general room : ', useAppData.user.id)
      }
    }
  }, [useAppData.user])

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

  return <>
    {children}
  </>
}