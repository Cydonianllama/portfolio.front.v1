import { useEffect } from "react";
import { socket } from "@/setup/socket";

export function useSocket() {
  
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

  return socket;
}