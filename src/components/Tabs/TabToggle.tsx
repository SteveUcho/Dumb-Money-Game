"use client";

import type { ReactElement } from "react";
import React, { useState, Children, cloneElement } from "react";
import { motion } from "motion/react";

interface TabToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  onActiveIndexChange?: (index: number) => void;
  children: ReactElement<HTMLDivElement>[];
}

export function TabToggle(props: TabToggleProps) {
  const { children, className, onActiveIndexChange, ...rest } = props;
  const childCount = Children.count(children);

  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => () => {
    setActiveIndex(index);
    onActiveIndexChange?.(index);
  };

  return (
    <div
      {...rest}
      className={"rounded-full relative bg-gray-100 dark:bg-gray-800 items-center p-1 " + className}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          width: `${100 / childCount}%`,
        }}
        animate={{
          x: `${activeIndex * 100}%`,
        }}
        className="absolute top-0 left-0 h-full bg-rh-green rounded-full"
      />
      <div className={`relative flex text-center`}>
        {Children.map(children, (child, index) => {
          const existingClass = child?.props?.className || "";
          // Validation: ensures only valid React elements are cloned
          if (React.isValidElement(child)) {
            return cloneElement(child as ReactElement<any>, {
              onClick: handleClick(index),
              className: existingClass + "flex-1",
            });
          }
          return child;
        })}
      </div>
    </div>
  );
}
