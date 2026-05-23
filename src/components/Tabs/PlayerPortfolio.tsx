import { WithPriceColor } from "@/components/WithPriceColor";
import { liquidGlass, liquidGlassShadow, popinCard } from "@/utils/classNames";
import type { OptionOrder, StockOrder, TabProps } from "@/utils/interfaceTypes";
import { motion } from "motion/react";
import { GridHeader } from "../GridHeader";
import DotAndCross from "@/images/dotAndCross.svg";
import Image from "next/image";

const orderData: (StockOrder | OptionOrder)[] = [
  {
    id: 1,
    type: "stock",
    shares: 100,
    ask: 90,
  },
  {
    id: 2,
    type: "option",
    strike: 90,
    ask: 95,
    contractSize: 100,
    expiration: "Q4",
  },
  {
    id: 3,
    type: "option",
    strike: 95,
    ask: 90,
    contractSize: 100,
    expiration: "Q2",
  },
];

export function PlayerPortfolio(props: TabProps) {
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
      <div className="absolute right-4 top-4 text-xl text-gray-500 z-20" onClick={handleClose}>
        <Image src={DotAndCross} alt="Close" className="w-6 h-6" />
      </div>
      <h3 className="text-3xl pb-2 border-b border-gray-400">Portfolio</h3>
      <div className="flex-1 overflow-auto">
        <div className="py-2 flex items-center justify-between">
          <h3 className="text-2xl">Cash</h3>
          <div className="text-xl">$500</div>
        </div>
        <div className="pb-2">
          <h3 className="text-2xl pb-1">Stocks</h3>
          <div className="grid grid-cols-4 pb-1 mb-2 border-b border-gray-400">
            <GridHeader>SHARES</GridHeader>
            <GridHeader>PRICE</GridHeader>
            <GridHeader>CHANGE</GridHeader>
            <GridHeader className="text-center">ACTION</GridHeader>
          </div>
          <div className="grid grid-cols-4 items-center">
            <div>1000</div>
            <div>$400.54</div>
            <WithPriceColor price={1}>
              <div>+0.62%</div>
            </WithPriceColor>
            <WithPriceColor
              as={motion.div}
              border
              price={1}
              className="text-center rounded-full px-3 py-1"
              whileTap={{ scale: 0.9 }}
            >
              SELL
            </WithPriceColor>
          </div>
        </div>
        <div className="pb-2">
          <h3 className="text-2xl pb-1">Derivatives</h3>
          <div>
            {/* header */}
            <div className="grid grid-cols-5 pb-1 mb-2 border-b border-gray-400">
              <GridHeader>STRIKE</GridHeader>
              <GridHeader>ASK</GridHeader>
              <GridHeader>#</GridHeader>
              <GridHeader>EXPIR</GridHeader>
              <GridHeader className="text-center">TOTAL</GridHeader>
            </div>
            {/* columns */}
            {orderData
              .filter((item) => item.type === "option")
              .map((item) => (
                <div key={item.id} className="grid grid-cols-5 items-center pb-1">
                  <div>${item.strike}</div>
                  <div>${item.ask}</div>
                  <div>{item.contractSize}</div>
                  <WithPriceColor price={-10}>
                    <div>{item.expiration}</div>
                  </WithPriceColor>
                  <WithPriceColor price={-10} className="text-center">
                    ${item.ask * item.contractSize}
                  </WithPriceColor>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex bottom-4 left-4 right-4 border-t-2 border-black dark:border-white pt-2 justify-between items-center">
        <h3 className="inline text-2xl">Net Worth</h3>
        <WithPriceColor price={1} className="inline text-2xl">
          $500
        </WithPriceColor>
      </div>
    </motion.div>
  );
}
