"use client";

import { TabToggle } from "./Tabs/TabToggle";
import { playerSelectedAtom } from "@/utils/atoms";
import { useSetAtom } from "jotai";

type OrderHistoryProps = React.HTMLAttributes<HTMLDivElement>;

export function OrderHistory(props: OrderHistoryProps) {
  const setPlayer = useSetAtom(playerSelectedAtom);

  return (
    <div {...props} className={"dark:bg-gray-950 bg-green-300 p-4 " + props.className}>
      <div className="text-2xl">Order History</div>
      <div className="flex items-center gap-2">
        <div className="m-2">All</div>
        <TabToggle className="flex-1 my-2" onActiveIndexChange={(index) => setPlayer(index)}>
          <div>Bear1</div>
          <div>Bull1</div>
          <div>Bear2</div>
          <div>Bull2</div>
        </TabToggle>
      </div>
      <div>Nothing here</div>
    </div>
  );
}
