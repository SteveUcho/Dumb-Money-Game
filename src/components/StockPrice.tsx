"use client";

import { useAtomValue } from "jotai";
import { liquidGlass, liquidGlassShadow } from "../utils/classNames";
import { WithPriceColor } from "./WithPriceColor";
import { stockPriceHoverAtom } from "../utils/atoms";

const ipoPrice = 500;

export function StockPrice() {
  const stockPriceHover = useAtomValue(stockPriceHoverAtom);

  return (
    <div className={["absolute top-0 left-0 m-4", liquidGlass, liquidGlassShadow].join(" ")}>
      <h3 className="text-2xl">META</h3>
      <h3 className="text-xl">${Math.round((ipoPrice + (stockPriceHover ?? 0)) * 100) / 100}</h3>
      <WithPriceColor price={100}>▲ $100 Q1</WithPriceColor>
      <WithPriceColor price={-100}>▼ $100 YTD</WithPriceColor>
    </div>
  );
}
