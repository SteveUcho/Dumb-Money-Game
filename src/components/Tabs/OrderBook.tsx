import type { StockOrder, TabProps } from "@/utils/interfaceTypes";
import { GridHeader } from "../GridHeader";
import { WithPriceColor } from "../WithPriceColor";
import { motion } from "motion/react";
import { liquidGlass, liquidGlassShadow, popinCard } from "@/utils/classNames";
import DotAndCross from "@/images/dotAndCross.svg";
import { AvailableBalance } from "./AvailableBalance";
import Image from "next/image";

const orderBookData: StockOrder[] = [
  {
    id: 1,
    type: "stock",
    shares: 100,
    ask: 90,
  },
];

export function OrderBook(props: TabProps) {
  const { open, handleClose } = props;

  return (
    <motion.div
      initial={{ y: "100vh" }}
      animate={{ y: open ? 0 : "100vh" }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={[
        "flex flex-col z-10 sm:left-auto",
        popinCard,
        liquidGlass,
        liquidGlassShadow,
      ].join(" ")}
    >
      <AvailableBalance />
      <div className="absolute right-4 top-4 text-xl text-gray-500 z-20" onClick={handleClose}>
        <Image src={DotAndCross} alt="Close" className="w-6 h-6" />
      </div>
      <div className="pb-2">
        <div className="text-2xl">Order Book</div>
        <div className="pb-4">
          {/* header */}
          <div className="grid grid-cols-3 pb-1 mb-2 border-b border-gray-300">
            <GridHeader>SHARES</GridHeader>
            <GridHeader>ASK</GridHeader>
            <GridHeader className="text-center">BUY</GridHeader>
          </div>
          {/* columns */}
          {orderBookData
            .filter((item) => item.type === "stock")
            .map((item) => (
              <div key={item.id} className="grid grid-cols-3">
                <div>{item.shares}</div>
                <div>${item.ask}</div>
                <WithPriceColor
                  as={motion.div}
                  border
                  price={-10}
                  className="text-center p-1 rounded-full"
                  whileTap={{ scale: 0.9 }}
                >
                  ${item.shares * item.ask}
                </WithPriceColor>
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}
