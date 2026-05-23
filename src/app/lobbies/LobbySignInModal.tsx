"use client";

import { liquidGlass, liquidGlassShadow } from "@/utils/classNames";
import { motion } from "framer-motion";
import { useAtomValue } from "jotai";
import { showLobbyPasswordModalAtom } from "@/utils/atoms";
import Link from "next/link";
import { useSetAtom } from "jotai";

export function LobbySignInModal() {
  const lobbyName = useAtomValue(showLobbyPasswordModalAtom);
  const setShowLobbyPasswordModal = useSetAtom(showLobbyPasswordModalAtom);

  if (!lobbyName) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/5 z-50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={[
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 w-4/5 text-center max-h-[60vh] flex flex-col",
          liquidGlass,
          liquidGlassShadow,
        ].join(" ")}
      >
        <h2 className="text-2xl font-bold pb-6">Lobby Sign In</h2>
        <p className="text-lg">Current Lobby: {lobbyName}</p>
        <p className="text-lg">Enter your lobby code to join</p>
        <input
          className="mt-2 border border-gray-300 rounded p-2"
          type="text"
          placeholder="Enter lobby code"
        />
        <button onClick={() => setShowLobbyPasswordModal(null)} className="mt-2 bg-rh-red text-white p-2 rounded">
          Back to Lobbies
        </button>
        <Link href="/game" className="mt-2 bg-rh-green text-white p-2 rounded">
          Join Lobby
        </Link>
      </motion.div>
    </div>
  );
}
