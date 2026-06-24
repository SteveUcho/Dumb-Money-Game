import { Provider } from "jotai";
import { Outlet } from "react-router";
import { gameStateStore, GameSystemProvider } from "@/contexts/GameSystem";

function GameWrapper() {
  return (
    <Provider store={gameStateStore}>
      <GameSystemProvider>
        <Outlet />
      </GameSystemProvider>
    </Provider>
  );
}

export default GameWrapper;
