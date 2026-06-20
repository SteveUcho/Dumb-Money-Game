import { useSession } from "@/hooks/useSession";
import { useWs } from "@/hooks/useWs";
import { borderButton, liquidGlass, liquidGlassScale, liquidGlassShadow } from "@/utils/classNames";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useSWR from "swr";

interface LobbyData {
  lobbyId: string;
  title: string;
  ownerId: string;
  owner: string;
  maxPlayers: number;
  symbol: string;
  buyIn: number;
  players: {
    id: string;
    name: string;
  }[];
  playersReady: string[];
}

const lobbyData: LobbyData = {
  lobbyId: "123",
  title: "Lobby 1",
  ownerId: "1",
  owner: "Player 1",
  maxPlayers: 4,
  symbol: "aapl",
  buyIn: 100,
  players: [
    {
      id: "1",
      name: "Player 1",
    },
    {
      id: "2",
      name: "Player 2",
    },
    {
      id: "3",
      name: "Player 3",
    },
    {
      id: "4",
      name: "Player 4",
    },
  ],
  playersReady: ["1"],
};

const symbols = ["nvda", "aapl", "msft", "amzn", "googl", "avgo", "meta", "tsla", "lly"];

function Lobby() {
  const params = useParams();
  const { session } = useSession();
  const [connectionFailed, setConnectionFailed] = useState(false);

  const { conn, messages } = useWs(
    params.lobbyId ? `ws://${import.meta.env.VITE_BACKEND_URL}/ws/lobby/${params.lobbyId}` : null,
  );
  const { data } = useSWR<LobbyData>(params.lobbyId ? `/api/lobby/${params.lobbyId}` : null, {
    fallbackData: lobbyData,
  });

  useEffect(() => {
    let timer = setTimeout(() => {
      if (conn?.readyState !== WebSocket.OPEN) {
        setConnectionFailed(true);
      }
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [conn]);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (conn) {
      const form = e.currentTarget as HTMLFormElement;
      const message = form.message.value;
      conn.send(JSON.stringify({ type: "chat", message }));
      form.message.value = "";
    }
  };

  return (
    <div className="flex-1 min-h-0">
      <div className="h-1/3 flex flex-col p-2 gap-4">
        <div className="min-h-0 flex-1 grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2 hide-scrollbar overflow-y-auto">
            {data?.players.map((player) => (
              <div
                key={player.name}
                className={[
                  liquidGlass,
                  liquidGlassScale,
                  liquidGlassShadow,
                  "flex justify-between items-center",
                ].join(" ")}
              >
                <div>
                  <p>{player.name}</p>
                  <p>{data.playersReady.includes(player.id) ? "Ready" : "Not Ready"}</p>
                </div>
                {session?.identity?.id === player.id && <div className="text-amber-500">YOU</div>}
                {(session?.identity?.id === data?.ownerId || !session) &&
                  player.id !== data?.ownerId && (
                    <div className="flex gap-2">
                      <button className={[borderButton, "text-rh-red"].join(" ")}>Kick</button>
                      <button className={[borderButton, "text-amber-500"].join(" ")}>C</button>
                    </div>
                  )}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="text"
                name="title"
                className={[borderButton, "flex-1"].join(" ")}
                value={data?.title}
              />
            </form>
            <form onSubmit={handleSubmit} className="flex justify-between items-center">
              <p>Symbol:</p>
              <select name="symbols" className={borderButton} value={data?.symbol}>
                {symbols.map((symbol) => (
                  <option key={symbol} value={symbol}>
                    {symbol.toUpperCase()}
                  </option>
                ))}
              </select>
            </form>
            <form onSubmit={handleSubmit} className="flex justify-between items-center">
              <p>Max Players:</p>
              <input
                type="number"
                name="maxPlayers"
                className={[borderButton, "w-16"].join(" ")}
                value={data?.maxPlayers}
              />
            </form>
            <form onSubmit={handleSubmit} className="flex justify-between items-center">
              <p>Buy In:</p>
              <input
                type="number"
                name="buyIn"
                className={[borderButton, "w-16"].join(" ")}
                value={data?.buyIn}
              />
            </form>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Link to="/lobbies" className={["border-rh-red text-center", borderButton].join(" ")}>
            Leave Lobby
          </Link>
          <Link
            to={`/game/${params.lobbyId}`}
            className={["border-rh-green text-center", borderButton].join(" ")}
          >
            Ready
          </Link>
        </div>
      </div>
      <div className="h-2/3 bg-green-300 dark:bg-gray-800 p-4 flex flex-col">
        <div className="flex-1 flex flex-col min-h-0">
          <p>Chat</p>
          <div className="flex-1 overflow-auto">
            {messages.length === 0 && !connectionFailed ? <p>Loading...</p> : null}
            {connectionFailed ? <p>Connection failed</p> : null}
            {messages.map((message) => {
              if (message.type === "chat") {
                return (
                  <p key={message.messageId}>
                    {message.username}: {message.data.message}
                  </p>
                );
              } else if (message.type === "system") {
                return (
                  <p key={message.messageId}>
                    {message.username}: {message.data.username}
                    {message.data.action === "player_joined" ? " joined the lobby" : null}
                    {message.data.action === "player_left" ? " left the lobby" : null}
                  </p>
                );
              }
              return null;
            })}
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
    </div>
  );
}

export default Lobby;
