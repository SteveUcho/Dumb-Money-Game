"use client";

import { liquidGlass, liquidGlassScale, liquidGlassShadow, popinCard } from "@/utils/classNames";
import { motion, stagger, type Variants } from "motion/react";
import { WithPriceColor } from "@/components/WithPriceColor";
import { useState } from "react";

const data = [
  {
    id: 1,
    body: "Something happened in the market, price takes a dive",
    number: -15,
    conclusion: "Plunges -15%",
  },
  {
    id: 2,
    body: "Government takes a stake in the company",
    number: 15,
    conclusion: "Pops +15%",
  },
  {
    id: 3,
    body: "Something happened in the market, price takes a dive",
    number: -15,
    conclusion: "Plunges -15%",
  },
  {
    id: 4,
    body: "Government takes a stake in the company",
    number: 15,
    conclusion: "Pops +15%",
  },
];

const listVariant: Variants = {
  visible: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      delayChildren: stagger(0.1, { startDelay: 0.1 }),
    },
  },
  hidden: { y: "100vh" },
};

const itemVariant = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 20 },
};

export function ActionCards() {
  const [open, setOpen] = useState(false);

  const openCard = (open: boolean) => () => {
    setOpen(open);
  };

  return (
    <>
      <motion.div
        whileTap={{ scale: 0.9 }}
        className={[
          "absolute bottom-4 left-4 flex font-bold text-rh-green px-5.5",
          liquidGlass,
          liquidGlassScale,
        ].join(" ")}
        style={{ borderRadius: "100%" }}
        onClick={openCard(true)}
      >
        ▲
      </motion.div>
      <motion.div
        variants={listVariant}
        initial={{ y: 600 }}
        animate={open ? "visible" : "hidden"}
        style={{ height: "unset" }}
        className={"flex flex-col gap-4 " + popinCard}
      >
        <motion.div
          whileTap={{ scale: 0.9 }}
          style={{ border: "1px solid var(--color-rh-red)" }}
          className={[
            "absolute right-0 -top-18 text-xl z-20 rounded-full text-rh-red",
            liquidGlass,
            liquidGlassShadow,
            liquidGlassScale,
          ].join(" ")}
          onClick={() => setOpen(false)}
        >
          Close
        </motion.div>
        {data.map((cardData) => {
          return (
            <motion.div
              key={cardData.id}
              whileTap={{ scale: 0.9 }}
              variants={itemVariant}
              onClick={() => setOpen(false)}
              className={[
                liquidGlass,
                liquidGlassShadow,
                "p-6 text-center aspect-4/1 flex flex-col justify-center max-w-full",
              ].join(" ")}
            >
              <p>{cardData.body}</p>
              <WithPriceColor price={cardData.number}>{cardData.conclusion}</WithPriceColor>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
}
