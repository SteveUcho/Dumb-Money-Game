import { ActionSelector } from "@/components/Tabs/ActionSelector";
import { GameBoard } from "@/components/GameBoard";
import { StockPrice } from "@/components/StockPrice";
import { OrderHistory } from "@/components/OrderHistory";
import { gameStateStore } from "@/contexts/GameStateSystem";
import { Provider } from "jotai";

function GamePage() {
  return (
    <Provider store={gameStateStore}>
      <div className="flex-1 flex flex-col">
        <StockPrice />
        {/* Game Content */}
        <GameBoard className="flex-1" />
        <OrderHistory className="h-2/3 md:h-1/3" />
        {/* floating items */}
        <ActionSelector />
      </div>
    </Provider>
  );
}

export default GamePage;
