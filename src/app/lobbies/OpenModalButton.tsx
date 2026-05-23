"use client"

import { motion } from "motion/react";
import { useSetAtom } from "jotai";
import { showLobbyPasswordModalAtom } from "@/utils/atoms";

export function OpenModalButton({ lobbyName }: { lobbyName: string }) {
    const setShowLobbyPasswordModal = useSetAtom(showLobbyPasswordModalAtom);

    return (
        <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLobbyPasswordModal(lobbyName)}
            className="border border-rh-green text-rh-green p-1 rounded-xl"
        >
            Password
        </motion.button>
    );
}