"use client";

import { useState } from "react";
import { liquidGlass, liquidGlassScale } from "../../utils/classNames";
import { GambleTab } from "./OptionsTab/GambleTab";
import { ActionCards } from "./ActionCards";
import { OrderBook } from "./OrderBook";
import { PlayerPortfolio } from "./PlayerPortfolio";
import { motion } from "motion/react";

export function ActionSelector() {
  const [openChild, setOpenChild] = useState(-1);

  const handleClick = (index: number) => () => {
    setOpenChild(index);
  };
  const closeTab = () => setOpenChild(-1);

  return (
    <>
      <div
        className={["flex absolute bottom-4 right-4", liquidGlass, liquidGlassScale].join(" ")}
        style={{ padding: 0 }}
      >
        <motion.div
          whileTap={{ scale: 0.9, color: "var(--color-rh-red)" }}
          onClick={handleClick(1)}
          className="font-bold py-4 pl-5 pr-3"
        >
          Stocks
        </motion.div>
        <motion.div
          whileTap={{ scale: 0.9, color: "var(--color-rh-red)" }}
          onClick={handleClick(2)}
          className="font-bold py-4 pl-3 pr-3"
        >
          Options
        </motion.div>
        <motion.div
          whileTap={{ scale: 0.9, color: "var(--color-rh-red)" }}
          onClick={handleClick(3)}
          className="font-bold py-4 pl-3 pr-5"
        >
          Portfolio
        </motion.div>
      </div>
      <ActionCards />
      <OrderBook open={openChild === 1} handleClose={closeTab} />
      <GambleTab open={openChild === 2} handleClose={closeTab} />
      <PlayerPortfolio open={openChild === 3} handleClose={closeTab} />
    </>
  );
}
