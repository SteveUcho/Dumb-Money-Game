import { useEffect, useState } from "react";
import { useSession } from "./useSession";

interface WsMessage {
  id: string;
  type: "message" | "join_lobby" | "leave_lobby";
  message?: string;
  player: string;
}

export function useWs(url: string) {
  const { session } = useSession();
  const username = session?.identity?.traits.name.first;

  const [conn, setConn] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<WsMessage[]>([]);

  useEffect(() => {
    if (!url || !username) {
      return;
    }
    // Create WebSocket connection.
    const socket = new WebSocket(url);
    setConn(socket);

    // Connection opened
    socket.addEventListener("open", () => {
      const myUuid = globalThis.crypto.randomUUID();
      socket.send(
        JSON.stringify({
          id: myUuid,
          type: "join_lobby",
          player: username,
        }),
      );
    });

    // Listen for messages
    socket.addEventListener("message", (event) => {
      setMessages((prev) => [...prev, JSON.parse(event.data)]);
    });

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        const myUuid = globalThis.crypto.randomUUID();
        socket.send(JSON.stringify({ id: myUuid, type: "leave_lobby", player: username }));
      }
      socket.close();
    };
  }, [username]);

  return {
    conn,
    messages,
  };
}
