import { liquidGlass, liquidGlassShadow } from "@/utils/classNames";
import { Link } from "react-router";
import { LobbySignInModal } from "@/components/LobbySignInModal";
import { useState } from "react";
import useSWR from "swr";

interface Lobby {
  id: string;
  title: string;
  players: number;
  maxPlayers: number;
  passwordRequired?: boolean;
}

interface LobbiesResponse {
  lobbies: Lobby[];
}

const lobbies: Lobby[] = [
  {
    id: "1",
    title: "Lobby 1",
    players: 2,
    maxPlayers: 4,
  },
  {
    id: "2",
    title: "Lobby 2",
    players: 3,
    maxPlayers: 4,
    passwordRequired: true,
  },
  {
    id: "3",
    title: "Lobby 3",
    players: 4,
    maxPlayers: 4,
  },
  {
    id: "4",
    title: "Lobby 4",
    players: 5,
    maxPlayers: 5,
  },
  {
    id: "5",
    title: "Lobby 5",
    players: 6,
    maxPlayers: 6,
  },
  {
    id: "6",
    title: "Lobby 6",
    players: 7,
    maxPlayers: 7,
  },
];

function Lobbies() {
  const [showLobbySignInModal, setShowLobbySignInModal] = useState<string | null>(null);
  const { data, mutate } = useSWR<LobbiesResponse>("/api/lobbies/all", {
    fallbackData: { lobbies },
  });

  const handleCreateLobby = async () => {
    try {
      const response = await fetch("/api/lobbies/create", {
        method: "POST",
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        mutate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div
        className={[
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 w-7/8 text-center max-h-[60vh] flex flex-col",
          liquidGlass,
          liquidGlassShadow,
        ].join(" ")}
      >
        <h2 className="text-3xl mb-6">Game Lobbies</h2>
        <div className="flex flex-col gap-2 overflow-auto flex-1 min-h-0">
          {!data?.lobbies.length && <div>No lobbies available</div>}
          {data?.lobbies.map((lobby) => (
            <div
              key={lobby.id}
              className="grid grid-cols-3 gap-2 border border-white/20 p-2 rounded-lg items-center"
            >
              <div>{lobby.title}</div>
              <div>
                {lobby.players}/{lobby.maxPlayers} players
              </div>
              {lobby.passwordRequired ? (
                <button
                  onClick={() => setShowLobbySignInModal(lobby.title)}
                  className="border border-rh-green text-rh-green p-1 rounded-xl"
                >
                  Password
                </button>
              ) : (
                <Link
                  to={`/lobby/${lobby.id}`}
                  className={[
                    "border rounded-xl p-1",
                    lobby.players < lobby.maxPlayers
                      ? "border-rh-green text-rh-green"
                      : "border-rh-red text-rh-red",
                  ].join(" ")}
                >
                  Join
                </Link>
              )}
            </div>
          ))}
        </div>
        <button
          className="mt-6 bg-rh-green text-white px-4 py-2 rounded"
          onClick={handleCreateLobby}
        >
          Create Lobby
        </button>
      </div>
      {showLobbySignInModal && (
        <LobbySignInModal
          lobbyName={showLobbySignInModal}
          closeModal={() => setShowLobbySignInModal(null)}
        />
      )}
    </div>
  );
}

export default Lobbies;
