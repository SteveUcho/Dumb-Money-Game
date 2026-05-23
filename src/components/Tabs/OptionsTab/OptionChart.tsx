"use client";

import { useEffect, useRef, useState } from "react";
import { WithPriceColor } from "../../WithPriceColor";

interface OptionChartProps {
  type: "call" | "put";
  maxLoss: number;
}

export function OptionChart(props: OptionChartProps) {
  const { type, maxLoss } = props;
  const ref = useRef<SVGSVGElement | null>(null);
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);
  const [chartDimensions, setChartDimensions] = useState<{ height: number; width: number }>({
    height: 0,
    width: 0,
  });

  const pointerHover = (event: React.PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    setHoverPosition(mouseX);
  };

  const pointerLeave = () => {
    setHoverPosition(null);
  };

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      setChartDimensions({
        height: entries[0].contentRect.height,
        width: entries[0].contentRect.width,
      });
    });

    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, []);

  const hoverPercent = hoverPosition !== null ? hoverPosition / chartDimensions.width : 0;
  const hoverPrice = Math.max(
    maxLoss,
    (hoverPercent - 0.5) * (maxLoss / -0.15) * (type === "call" ? 1 : -1),
  );

  return (
    <div className="border-t border-gray-400 py-2">
      <div className="flex justify-between py-2">
        <div>Expected Profit and loss</div>
        <WithPriceColor price={hoverPosition ? hoverPrice : 0}>
          ${(hoverPosition ? hoverPrice : 0).toFixed(2)}
        </WithPriceColor>
      </div>
      <svg
        ref={ref}
        width="100%"
        height="200"
        viewBox="0 0 300 200"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        onPointerMove={pointerHover}
        onPointerDown={pointerHover}
        onPointerCancel={pointerLeave}
        onPointerLeave={pointerLeave}
        className="fill-black dark:fill-white stroke-black dark:stroke-white"
      >
        {type === "call" ? (
          <>
            {/* green triangle in 4th quadrant */}
            <polygon
              points="150,100 300,100 300,25"
              className="fill-rh-green"
              opacity={0.5}
              stroke="transparent"
            />
            {/* line ontop of triangle */}
            <line x1="150" y1="100" x2="300" y2="25" stroke="black" strokeWidth="5" />
            <line x1="150" y1="100" x2="300" y2="25" className="stroke-rh-green" strokeWidth="3" />
            {/* red trapezoid in 2nd quadrant */}
            <polygon
              points="25,100 25,125 100,125 150,100"
              className="fill-rh-red"
              opacity={0.5}
              stroke="transparent"
            />
            {/* line under trapezoid */}
            <line x1="25" y1="125" x2="100" y2="125" stroke="black" strokeWidth="5" />
            <line x1="25" y1="125" x2="100" y2="125" className="stroke-rh-red" strokeWidth="3" />
            <line x1="100" y1="125" x2="150" y2="100" stroke="black" strokeWidth="5" />
            <line x1="100" y1="125" x2="150" y2="100" className="stroke-rh-red" strokeWidth="3" />
          </>
        ) : (
          <>
            {/* green triangle in 1st quadrant */}
            <polygon
              points="150,100 25,100 25,25"
              className="fill-rh-green"
              opacity={0.5}
              stroke="transparent"
            />
            {/* line ontop of triangle */}
            <line x1="150" y1="100" x2="25" y2="25" stroke="black" strokeWidth="5" />
            <line x1="150" y1="100" x2="25" y2="25" className="stroke-rh-green" strokeWidth="3" />
            {/* red trapezoid in 3rd quadrant */}
            <polygon
              points="150,100 300,100 300,125 200,125 "
              className="fill-rh-red"
              opacity={0.5}
              stroke="transparent"
            />
            {/* line under trapezoid */}
            <line x1="200" y1="125" x2="100%" y2="125" stroke="black" strokeWidth="5" />
            <line x1="200" y1="125" x2="100%" y2="125" className="stroke-rh-red" strokeWidth="3" />
            <line x1="200" y1="125" x2="150" y2="100" stroke="black" strokeWidth="5" />
            <line x1="200" y1="125" x2="150" y2="100" className="stroke-rh-red" strokeWidth="3" />
          </>
        )}
        {/* dotted horizontal line at top */}
        <line x1="0" y1="0" x2="100%" y2="0" strokeWidth="2" strokeDasharray="2 2" />
        {/* positive indicator */}
        <text x="10" y="60" textAnchor="middle" fontSize="20">
          +
        </text>
        {/* 0 indicator */}
        <text x="10" y="108" textAnchor="middle" fontSize="20">
          0
        </text>
        {/* solid horizontal line at the middle */}
        <line x1="25" y1="100" x2="100%" y2="100" strokeWidth="1" />

        {/* negative indicator */}
        <text x="10" y="160" textAnchor="middle" fontSize="20">
          -
        </text>
        {/* dotted horizontal line at bottom */}
        <line x1="0" y1="200" x2="100%" y2="200" strokeWidth="2" strokeDasharray="2 2" />
        {/* vertical line down the center */}
        <line x1="50%" y1="0" x2="50%" y2="200" stroke="gray" />
        {/* vertical hover line down the center */}
        <line
          x1={hoverPosition ? 300 * hoverPercent : "50%"}
          y1="0"
          x2={hoverPosition ? 300 * hoverPercent : "50%"}
          y2="200"
        />
        {/* white circle at the middle */}
        <circle cx="50%" cy="100" r="5" fill="white" stroke="black" strokeWidth="1" />
      </svg>
    </div>
  );
}
