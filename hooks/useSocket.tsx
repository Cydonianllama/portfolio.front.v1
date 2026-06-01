import { useEffect } from "react";
import { socket } from "@/setup/socket";

export function useSocket() {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  return socket;
}