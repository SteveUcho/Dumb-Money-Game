import { ActionSelector } from "@/components/Tabs/ActionSelector";
import { GameBoard } from "@/components/GameBoard";
import { StockPrice } from "@/components/StockPrice";
import { OrderHistory } from "@/components/OrderHistory";
import { GameStateProvider } from "@/contexts/gameStateProvider";

function GamePage() {
  return (
    <GameStateProvider>
      <div className="flex-1 flex flex-col">
        <StockPrice />
        {/* Game Content */}
        <GameBoard className="flex-1" />
        <OrderHistory className="h-2/3 md:h-1/3" />
        {/* floating items */}
        <ActionSelector />
      </div>
    </GameStateProvider>
  );
}

export default GamePage;
