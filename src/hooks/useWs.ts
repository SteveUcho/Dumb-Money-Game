import type { WsMessage } from "@/types/GameSystemTypes";
import { useEffect, useState } from "react";

export function useWs(url: string | null) {
  const [conn, setConn] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<WsMessage[]>([]);

  useEffect(() => {
    if (!url) {
      return;
    }
    // Create WebSocket connection.
    const socket = new WebSocket(url);
    setConn(socket);

    // Listen for messages
    socket.addEventListener("message", (event) => {
      setMessages((prev) => [...prev, JSON.parse(event.data)]);
    });

    return () => {
      socket.close();
    };
  }, [url]);

  return {
    conn,
    messages,
  };
}
