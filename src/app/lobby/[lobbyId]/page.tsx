import { ChatBox } from "@/app/lobby/[lobbyId]/ChatBox";
import { borderButton } from "@/utils/classNames";
import Link from "next/link";

const lobbyData = {
    lobbyId: "123",
    owner: "Player 1",
    players: [
        {
            name: "Player 1",
            ready: false,
        },
        {
            name: "Player 2",
            ready: false,
        },
        {
            name: "Player 3",
            ready: false,
        },
        {
            name: "Player 4",
            ready: false,
        },
    ],
};

async function Lobby(props: PageProps<"/lobby/[lobbyId]">) {
    const { lobbyId } = await props.params;

    return (
        <div className="flex-1 min-h-0">
            <div className="h-1/3 flex flex-col">
                <div className="flex-1 grid grid-cols-2 gap-2">
                    <div>
                        {lobbyData.players.map((player) => (
                            <div key={player.name} className="flex gap-2">
                                <p>{player.name}</p>
                                <p>{player.ready ? "Ready" : "Not Ready"}</p>
                            </div>
                        ))}
                    </div>
                    <div></div>
                </div>
                <div className="grid grid-cols-2 gap-4 p-2">
                    <Link href="/lobbies" className={["border-rh-red text-center", borderButton].join(" ")}>
                        Leave Lobby
                    </Link>
                    <Link href="/game" className={["border-rh-green text-center", borderButton].join(" ")}>
                        Ready
                    </Link>
                </div>
            </div>
            <ChatBox lobbyId={lobbyId} />
        </div>
    );
}

export default Lobby;
