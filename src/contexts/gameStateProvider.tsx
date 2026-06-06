import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

interface GameState {
  id: string;
}

type GameStateProviderProps = {
  children: ReactNode;
};

type GameStateContextType = GameState | null;

export const GameStateContext = createContext<GameStateContextType | null>(null);

export function GameStateProvider(props: Readonly<GameStateProviderProps>) {
  const { children } = props;
  const [game, _setGame] = useState<GameState | null>(null);

  return <GameStateContext.Provider value={game}>{children}</GameStateContext.Provider>;
}

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error("useGameState must be used within a GameStateProvider");
  }
  return context;
};
