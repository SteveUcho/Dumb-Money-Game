import { motion } from "motion/react";
import { liquidGlass, liquidGlassShadow, popinCard } from "@/utils/classNames";
import DotAndCross from "@/images/dotAndCross.svg";
import { TabToggle } from "../TabToggle";
import { useState } from "react";
import { OptionChart } from "./OptionChart";
import { AvailableBalance } from "../AvailableBalance";
import { OrderButton } from "./OrderButton";
import Image from "next/image";

interface GambleTabProps {
  open: boolean;
  handleClose: () => void;
}

export function GambleTab(props: GambleTabProps) {
  const { open, handleClose } = props;
  const [tab, setTab] = useState<"call" | "put">("call");
  const [contracts, setContracts] = useState(1);
  const [limitPrice, setLimitPrice] = useState({ string: "$2.00", number: 2 });
  const [strikePrice, setStrikePrice] = useState({ string: "$0.00", number: 0 });

  const handleContractsChange = (value: string) => {
    const newValue = parseInt(value.replace(/^0+/, ""));
    if (isNaN(newValue)) {
      setContracts(1);
      return;
    }
    setContracts(newValue);
  };

  const handlePriceChange =
    (setter: React.Dispatch<React.SetStateAction<{ string: string; number: number }>>) =>
      (value: string) => {
        let newValue = value.trim();
        if (newValue === "") {
          setter({ string: "$0.00", number: 0 });
          return;
        }
        newValue = newValue.replace("$", "");
        newValue = newValue.replace(/^0+/, "");
        setter({ string: "$" + newValue, number: Number(newValue) });
      };

  return (
    <motion.div
      initial={{ y: "100vh" }}
      animate={{ y: open ? 0 : "100vh" }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={[
        popinCard,
        liquidGlass,
        liquidGlassShadow,
        "flex flex-col sm:left-auto z-10",
      ].join(" ")}
    >
      <AvailableBalance />
      <div className="absolute right-4 top-5 text-xl text-gray-500 z-20" onClick={handleClose}>
        <Image src={DotAndCross} alt="Close" className="w-6 h-6" />
      </div>
      <TabToggle
        onActiveIndexChange={(index) => setTab(index === 0 ? "call" : "put")}
        className="mr-8 mb-2"
      >
        <div>Call</div>
        <div>Put</div>
      </TabToggle>
      <div className="sm:right-auto flex flex-col gap-4 flex-1 overflow-auto">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div>
              <div>Contracts</div>
              <div className="text-sm text-gray-400">100 Shares Each</div>
            </div>
            <input
              type="number"
              className="border border-gray-500 w-25 rounded-lg text-right pr-3"
              value={contracts}
              onChange={(e) => handleContractsChange(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <div>
              <div>Strike Price</div>
              <div className="text-sm text-gray-400">Price at expiry</div>
            </div>
            <input
              type="text"
              className="border border-gray-500 w-25 rounded-lg text-right pr-3"
              value={strikePrice.string}
              onChange={(e) => handlePriceChange(setStrikePrice)(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <div>
              <div>Limit Price</div>
              <div className="text-sm text-gray-400">Most you're willing to pay</div>
            </div>
            <input
              type="text"
              className="border border-gray-500 w-25 rounded-lg text-right pr-3"
              value={limitPrice.string}
              onChange={(e) => handlePriceChange(setLimitPrice)(e.target.value)}
            />
          </div>
        </div>
        <div>
          <OptionChart type={tab} maxLoss={contracts * limitPrice.number * 100 * -1} />
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <div className="flex items-center">
                <span>
                  <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="4" className="fill-rh-green" />
                  </svg>
                </span>
                <span>Max Profit</span>
              </div>
              <div>Unlimited</div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <span>
                  <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="4" className="fill-rh-red" />
                  </svg>
                </span>
                <span>Max Loss</span>
              </div>
              <div>${contracts * 100 * limitPrice.number}</div>
            </div>
          </div>
        </div>
      </div>
      <OrderButton contracts={contracts} limitPrice={limitPrice.number} />
    </motion.div>
  );
}
