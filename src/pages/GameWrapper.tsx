import { Provider } from "jotai";
import { gameStateStore } from "@/contexts/GameStateSystem";
import { Outlet } from "react-router";

function GameWrapper() {
  return (
    <Provider store={gameStateStore}>
      <Outlet />
    </Provider>
  );
}

export default GameWrapper;
