export type DataPoint = { x: number; y: number };
export type PlayerChartData = { username: string; points: DataPoint[]; color: string };

export interface StockInfo {
  symbol: string;
  price: number;
  qChange: number;
  ytdChange: number;
}

export interface OrderBook {
  bids: { price: number; size: number }[];
  asks: { price: number; size: number }[];
}
