import { useEffect, useState } from "react";

interface WsData {
  clientId: string;
  username: string;
  messageId: string;
  message?: WsMessage;
}

interface WsMessage {
  type: "message" | "join_lobby" | "leave_lobby";
  message?: string;
}

export function useWs(url: string | null) {
  const [conn, setConn] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<WsData[]>([]);

  useEffect(() => {
    if (!url) {
      return;
    }
    // Create WebSocket connection.
    const socket = new WebSocket(url);
    setConn(socket);

    // Connection opened
    socket.addEventListener("open", () => {
      socket.send(
        JSON.stringify({
          type: "join_lobby",
        }),
      );
    });

    // Listen for messages
    socket.addEventListener("message", (event) => {
      setMessages((prev) => [...prev, JSON.parse(event.data)]);
    });

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "leave_lobby" }));
      }
      socket.close();
    };
  }, [url]);

  return {
    conn,
    messages,
  };
}
