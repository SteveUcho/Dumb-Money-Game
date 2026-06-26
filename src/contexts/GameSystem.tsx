import { createStore } from "jotai";
import { useEffect } from "react";
import { useParams } from "react-router";
import type { WsMessage } from "@/types/GameSystemTypes";

export const gameStateStore = createStore();

type WsMessageHandler = (msg: WsMessage) => void;

class SocketClient {
  private readonly handlers = new Map<string, Set<WsMessageHandler>>();
  ws: WebSocket | null = null;

  connect(url: string) {
    this.ws = new WebSocket(url);
    this.ws.onmessage = (event) => {
      const msgs = (event.data as string)
        .split("\n")
        .map((line) => JSON.parse(line)) as WsMessage[];

      msgs.forEach((msg) => {
        const listeners = this.handlers.get(msg.type);
        listeners?.forEach((fn) => fn(msg));
      });
    };
  }

  disconnect() {
    this.ws?.close();
  }

  send(message: string) {
    this.ws?.send(message);
  }

  on(type: string, callback: WsMessageHandler) {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, new Set());
    }

    const theSet = this.handlers.get(type);
    if (theSet) {
      theSet.add(callback);
    }

    return () => {
      this.handlers.get(type)?.delete(callback);
    };
  }
}

export const socket = new SocketClient();

interface GameSystemProviderProps {
  children: React.ReactNode;
}

export function GameSystemProvider(props: Readonly<GameSystemProviderProps>) {
  const params = useParams();

  useEffect(() => {
    if (!params.lobbyId) {
      return;
    }
    socket.connect(`ws://${import.meta.env.VITE_BACKEND_URL}/ws/lobby/${params.lobbyId}`);

    return () => {
      socket.disconnect();
    };
  }, [params.lobbyId]);

  return props.children;
}
