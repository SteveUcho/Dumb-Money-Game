import { useEffect, useState } from "react";

interface WsData {
  type: string;
  messageId: string;
  playerId: string;
  username: string;
}

interface ChatMessage extends WsData {
  type: "chat";
  data: {
    message: string;
  };
}

interface SystemMessage extends WsData {
  type: "system";
  data: {
    action: "player_joined" | "player_left";
    playerId: string;
    username: string;
  };
}

export function useWs(url: string | null) {
  const [conn, setConn] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<(ChatMessage | SystemMessage)[]>([]);

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
