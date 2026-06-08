import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const stockPriceHoverAtom = atom<number | null>(0);
export const showWelcomeModalAtom = atom<boolean>(true);

export const darkModeAtom = atomWithStorage<boolean>("darkMode", false);

export const currentLobbyAtom = atom<string | null>(null);
export const availableBalanceAtom = atom<number>(10000);
export const playerSelectedAtom = atom<number | null>(null);
