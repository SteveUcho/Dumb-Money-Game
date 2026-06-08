import { createStore } from "jotai";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useSWRConfig } from "swr";

export const gameStateStore = createStore();

const swrKeys = ["/api/game/stock-chart-points", "/api/game/stock-info", "/api/game/order-book"];

export const GameStateSystem = () => {
  const params = useParams();
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (!params.gameId) {
      return;
    }
    const socket = new WebSocket(
      `ws://${import.meta.env.VITE_BACKEND_URL}/ws/game-events/${params.gameId}`,
    );
    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "refresh") {
        swrKeys.forEach((key) => {
          mutate(key);
        });
      }
    });
    socket.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
    });
    return () => socket.close();
  }, [params.gameId]);

  return null;
};
