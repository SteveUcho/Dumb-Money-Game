"use client";

import { MenuButton } from "./MenuButton";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { darkModeAtom } from "../utils/atoms";
import { useAtom } from "jotai";
import { liquidGlass, liquidGlassShadow } from "../utils/classNames";
import { AnimatePresence } from "motion/react";
import Link from "next/link";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex flex-row-reverse p-4">
      <div className="flex flex-col items-end relative">
        <MenuButton onClick={handleOpen} />
        {/* dropdown menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={[
                liquidGlass,
                liquidGlassShadow,
                "absolute mt-4 top-full right-0 w-fit text-center flex flex-col z-50",
              ].join(" ")}
            >
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-gray-200 hover:dark:bg-gray-800 text-nowrap border-b border-gray-800"
              >
                Toggle Dark
              </button>
              <Link
                href="/home"
                className="p-2 hover:bg-gray-200 hover:dark:bg-gray-800 text-nowrap border-b border-gray-800"
              >
                Home
              </Link>
              <button className="p-2 hover:bg-gray-200 hover:dark:bg-gray-800 text-nowrap border-b border-gray-800">
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
