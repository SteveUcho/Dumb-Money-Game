import type React from "react";
import { motion, useAnimate } from "motion/react";
import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { stockPriceHoverAtom } from "../utils/atoms";
import { PlayerGamePaths } from "./PlayerGamePaths";
import type { DataPoint, PlayerChartData } from "@/types/GameTypes";
import useSWR from "swr";
import { useParams } from "react-router";

// data points should always start at 0,0
// x is from 0 to 1000 -- for now? --- per quarter
const stockDataPoints: DataPoint[] = [
  { x: 0, y: 0 },
  { x: 120, y: 0 },
  { x: 280, y: -50 },
  { x: 610, y: 50 },
  { x: 950, y: 50 },
];

const playersDataPoints: PlayerChartData[] = [
  {
    username: "Player 1",
    points: [
      { x: 0, y: 0 },
      { x: 120, y: 10 },
      { x: 280, y: 20 },
      { x: 610, y: 50 },
      { x: 950, y: 50 },
    ],
    color: "red",
  },
  {
    username: "Player 2",
    points: [
      { x: 0, y: 0 },
      { x: 120, y: 5 },
      { x: 280, y: -300 },
      { x: 610, y: 30 },
      { x: 950, y: -200 },
    ],
    color: "blue",
  },
  {
    username: "Player 3",
    points: [
      { x: 0, y: 0 },
      { x: 120, y: 15 },
      { x: 280, y: -100 },
      { x: 610, y: 40 },
      { x: 950, y: 400 },
    ],
    color: "green",
  },
  {
    username: "Player 4",
    points: [
      { x: 0, y: 0 },
      { x: 120, y: 15 },
      { x: 280, y: 300 },
      { x: 610, y: 40 },
      { x: 950, y: -100 },
    ],
    color: "purple",
  },
];

const topPadding = 35;
const bottomPadding = 20;

function transformPoints(
  dataPoints: DataPoint[],
  dimensions: { height: number; width: number },
  yRange?: { min: number; max: number }, // if not provided, will calculate from dataPoints, used for consistent y-axis scaling across multiple datasets
): DataPoint[] {
  if (!dataPoints.length) return [];
  let minY: number;
  let maxY: number;
  if (yRange) {
    minY = yRange.min;
    maxY = yRange.max;
  } else {
    minY = 0;
    maxY = 0;
    dataPoints.forEach((point) => {
      minY = Math.min(minY, point.y);
      maxY = Math.max(maxY, point.y);
    });
  }
  let offset = 0;
  if (minY < 0) offset = minY * -1;
  offset += bottomPadding;
  let yDiff = maxY - minY;
  return dataPoints.map((point) => {
    const widthPercent = point.x / 1000;
    const heightPercent = (point.y + offset) / (yDiff + topPadding + bottomPadding);
    const unFlippedY = dimensions.height * heightPercent;
    const flippedY = dimensions.height - unFlippedY;
    return { x: dimensions.width * widthPercent, y: flippedY };
  });
}

function convertToPath(dataPoints: DataPoint[]): string {
  if (!dataPoints || dataPoints.length === 0) return "";
  return "M" + dataPoints.map((point) => `${point.x},${point.y}`).join("L");
}

function getYFromX(points: DataPoint[], x: number): number | null {
  if (!points || points.length === 0) return null;

  // Clamp to bounds
  if (x <= points[0].x) return points[0].y;
  if (x >= points[points.length - 1].x) {
    return points[points.length - 1].y;
  }

  // Binary search to find the segment
  let left = 0;
  let right = points.length - 1;

  while (left < right - 1) {
    const mid = Math.floor((left + right) / 2);
    if (points[mid].x <= x) {
      left = mid;
    } else {
      right = mid;
    }
  }

  const p1 = points[left];
  const p2 = points[left + 1];

  // Linear interpolation
  const t = (x - p1.x) / (p2.x - p1.x);
  return p1.y + t * (p2.y - p1.y);
}

interface ChartData {
  players: PlayerChartData[];
  stock: DataPoint[];
}

export function GameBoard(props: Readonly<React.HtmlHTMLAttributes<HTMLDivElement>>) {
  const params = useParams();
  const [scope, animate] = useAnimate();
  const [boardDimensions, setBoardDimensions] = useState({ width: 100, height: 100 });
  const setStockPriceHover = useSetAtom(stockPriceHoverAtom);

  const { data } = useSWR<ChartData>(
    params.gameId ? `/api/game/stock-chart-points/${params.gameId}` : null,
    {
      fallbackData: { players: playersDataPoints, stock: stockDataPoints },
    },
  );

  const stockPoints = transformPoints(data?.stock ?? [], boardDimensions);
  const stockLinePath = convertToPath(stockPoints);

  const yRange = data?.players.reduce(
    (acc, player) => {
      let minY = 0;
      let maxY = 0;
      player.points.forEach((point) => {
        minY = Math.min(minY, point.y);
        maxY = Math.max(maxY, point.y);
      });
      return {
        min: Math.min(acc.min, minY),
        max: Math.max(acc.max, maxY),
      };
    },
    { min: 0, max: 0 },
  );
  const playerPoints = data?.players.map((player) =>
    transformPoints(player.points, boardDimensions, yRange),
  );
  const playerLinePaths = playerPoints?.map(convertToPath) ?? [];

  const pointerHover: React.MouseEventHandler<SVGElement> = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;

    const stockPath = scope.current?.querySelector("path");
    const hoverLine = scope.current?.querySelector("#hover-line");
    const hoverCircle = scope.current?.querySelector("#hover-circle");

    // set corect line position
    hoverLine.setAttribute("x1", mouseX);
    hoverLine.setAttribute("x2", mouseX);

    // show hover line
    hoverLine.setAttribute("opacity", 1);
    hoverCircle.setAttribute("opacity", 1);

    const boxWidth = rect.right - rect.x / rect.left;
    const widthPercent = mouseX / boxWidth;
    const priceY = getYFromX(data?.stock ?? [], 1000 * widthPercent);
    setStockPriceHover(priceY ?? 0);

    const points = stockPoints;

    if (!stockPath || !hoverCircle || !points.length) return;

    const pathY = getYFromX(points, mouseX);

    hoverCircle.setAttribute("cx", mouseX);
    hoverCircle.setAttribute("cy", pathY);
  };

  const pointerLeave = () => {
    const hoverLine = scope.current?.querySelector("#hover-line");
    const circle = scope.current?.querySelector("#hover-circle");

    hoverLine.setAttribute("opacity", 0);
    circle.setAttribute("opacity", 0);

    setStockPriceHover(null);
  };

  useEffect(() => {
    if (!scope.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      setBoardDimensions({
        height: entries[0].contentRect.height,
        width: entries[0].contentRect.width,
      });
    });

    resizeObserver.observe(scope.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const path: SVGGeometryElement = scope.current.querySelector("#stock-line");
    const followCircle = scope.current.querySelector("#follow-circle");
    const endCircle = scope.current.querySelector("#end-circle");
    const totalLength = path.getTotalLength();

    if (!path || !totalLength) return;
    animate(
      path,
      { pathLength: 1 },
      {
        type: "spring",
        delay: 0.3,
        duration: 3,
        onUpdate: (latest) => {
          const point = path.getPointAtLength(latest * totalLength);
          followCircle.setAttribute("cx", point.x);
          followCircle.setAttribute("cy", point.y);
        },
        onComplete: () => {
          followCircle.setAttribute("opacity", 0);
          endCircle.setAttribute("opacity", 1);
        },
      },
    );
  }, [animate, scope, boardDimensions]);

  return (
    <div {...props} className={"px-4 " + props.className}>
      <svg
        ref={scope}
        width="100%"
        height="100%"
        onPointerMove={pointerHover}
        onPointerDown={pointerHover}
        onPointerCancel={pointerLeave}
        onPointerLeave={pointerLeave}
        style={{ touchAction: "none" }}
      >
        <line
          x1={"28%"}
          y1="40"
          x2={"28%"}
          y2={"100%"}
          opacity={0.2}
          stroke="gray"
          strokeWidth="2"
          strokeDasharray="10, 5"
        />
        <text
          x={"12%"}
          y={"90%"}
          opacity={0.3}
          fontSize={24}
          stroke="gray"
          fill="gray"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          Jan
        </text>
        <line
          x1={"61%"}
          y1="40"
          x2={"61%"}
          y2={"100%"}
          opacity={0.2}
          stroke="gray"
          strokeWidth="2"
          strokeDasharray="10, 5"
        />
        <text
          x={"44%"}
          y={"90%"}
          opacity={0.3}
          fontSize={24}
          stroke="gray"
          fill="gray"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          Feb
        </text>
        <line
          x1={"95%"}
          y1="40"
          x2={"95%"}
          y2={"100%"}
          opacity={0.5}
          stroke="gray"
          strokeWidth="2"
          strokeDasharray="10, 5"
        />
        <text
          x={"77%"}
          y={"90%"}
          opacity={0.3}
          fontSize={24}
          stroke="gray"
          fill="gray"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          Mar
        </text>
        <text
          textAnchor="middle"
          x={"95%"}
          y={25}
          opacity={0.3}
          fontSize={24}
          stroke="gray"
          strokeWidth={1}
          fill="gray"
        >
          Q1
        </text>
        <PlayerGamePaths
          playerLinePaths={playerLinePaths}
          playersDataPoints={data?.players ?? []}
        />
        <motion.path
          id="stock-line"
          d={stockLinePath}
          strokeOpacity={1}
          strokeWidth={2}
          className="stroke-rh-green"
          fill="transparent"
          initial={{ pathLength: 0 }}
        />
        <line
          id="hover-line"
          x1="0"
          y1="40"
          x2="0"
          y2={"100%"}
          opacity="0"
          className="stroke-black dark:stroke-white"
          strokeWidth="2"
        />
        <circle
          id="hover-circle"
          cx="10"
          cy="10"
          r="8"
          opacity="0"
          strokeWidth={4}
          className="stroke-white dark:stroke-black fill-rh-green"
        />
        <circle
          id="follow-circle"
          cx="0"
          cy="0"
          r="8"
          strokeWidth={4}
          className="dark:stroke-white fill-rh-green"
        />
        <circle
          id="end-circle"
          cx="95%"
          cy={stockPoints.at(-1)?.y ?? 0}
          r="8"
          opacity={0}
          strokeWidth={4}
          className="dark:stroke-white fill-rh-green"
        />
      </svg>
    </div>
  );
}
