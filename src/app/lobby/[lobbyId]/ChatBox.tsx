"use client";

import { usernameAtom } from "@/utils/atoms";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

interface WsMessage {
  id: string;
  type: "message" | "join_lobby" | "leave_lobby";
  message?: string;
  player: string;
}

export const ChatBox = ({ lobbyId }: { lobbyId: string }) => {
  const [conn, setConn] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<WsMessage[]>([]);
  const username = useAtomValue(usernameAtom);

  useEffect(() => {
    if (!username || !lobbyId) return;
    // Create WebSocket connection.
    const socket = new WebSocket(
      `ws://${process.env.NEXT_PUBLIC_BACKEND_URL}/ws/lobby/chat/${lobbyId}`,
    );
    setConn(socket);

    // Connection opened
    socket.addEventListener("open", () => {
      const myUuid = self.crypto.randomUUID();
      socket.send(
        JSON.stringify({
          id: myUuid,
          type: "join_lobby",
          lobbyId: lobbyId,
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
        const myUuid = self.crypto.randomUUID();
        socket.send(JSON.stringify({ id: myUuid, type: "leave_lobby", player: username }));
      }
      socket.close();
    };
  }, [username]);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (conn && username) {
      const form = e.currentTarget as HTMLFormElement;
      const message = form.message.value;
      const myUuid = self.crypto.randomUUID();
      conn.send(JSON.stringify({ id: myUuid, type: "message", message, player: username }));
      form.message.value = "";
    }
  };

  return (
    <div className="h-2/3 bg-green-300 dark:bg-gray-800 p-4 flex flex-col">
      <div className="flex-1 flex flex-col min-h-0">
        <p>Chat</p>
        <div className="flex-1 overflow-auto">
          {messages.map((message) => (
            <p key={message.id}>
              {message.player}: {message.type === "join_lobby" ? "Joined the lobby" : null}
              {message.type === "leave_lobby" ? "Left the lobby" : null}
              {message.type === "message" ? message.message : null}
            </p>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="pt-2">
        <div className="flex gap-2">
          <input
            name="message"
            type="text"
            placeholder="Type a message..."
            className="border border-gray-300 dark:border-gray-600 rounded-xl p-2 flex-1"
          />
          <button className="rounded-xl bg-rh-green p-2">Send</button>
        </div>
      </form>
    </div>
  );
};
