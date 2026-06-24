import { ActionSelector } from "@/components/Tabs/ActionSelector";
import { GameBoard } from "@/components/GameBoard";
import { StockPrice } from "@/components/StockPrice";
import { OrderHistory } from "@/components/OrderHistory";

function GamePage() {
  return (
    <div className="flex-1 flex flex-col">
      <StockPrice />
      {/* Game Content */}
      <GameBoard className="flex-1" />
      <OrderHistory className="h-2/3 md:h-1/3" />
      {/* floating items */}
      <ActionSelector />
    </div>
  );
}

export default GamePage;
