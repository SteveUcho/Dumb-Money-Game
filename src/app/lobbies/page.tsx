import { liquidGlass, liquidGlassShadow } from "@/utils/classNames";
import { LobbySignInModal } from "@/app/lobbies/LobbySignInModal";
import Link from "next/link";
import { OpenModalButton } from "./OpenModalButton";

const lobbies = [
    {
        id: 1,
        name: "Lobby 1",
        players: 2,
    },
    {
        id: 2,
        name: "Lobby 2",
        players: 3,
        passwordRequired: true,
    },
    {
        id: 3,
        name: "Lobby 3",
        players: 4,
    },
    {
        id: 4,
        name: "Lobby 4",
        players: 5,
    },
    {
        id: 5,
        name: "Lobby 5",
        players: 6,
    },
    {
        id: 6,
        name: "Lobby 6",
        players: 7,
    },
];

function Lobbies() {
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
                    {lobbies.map((lobby) => (
                        <div
                            key={lobby.id}
                            className="grid grid-cols-3 gap-2 border border-white/20 p-2 rounded-lg items-center"
                        >
                            <div>{lobby.name}</div>
                            <div>{lobby.players} players</div>
                            {lobby.passwordRequired ? (
                                <OpenModalButton lobbyName={lobby.name} />
                            ) : (
                                <Link
                                    href={`/lobby/${lobby.name}`}
                                    className="border border-rh-green text-rh-green p-1 rounded-xl"
                                >
                                    Join
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
                <button className="mt-6 bg-rh-green text-white px-4 py-2 rounded">Create Lobby</button>
            </div>
            <LobbySignInModal />
        </div>
    );
}

export default Lobbies;
