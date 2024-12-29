"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the component only renders after the client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null; // Prevent rendering before mount

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={toggleTheme}
        className="relative w-16 h-8 bg-gradient-to-r from-blue-200 dark:from-black to-pink-200 dark:to-purple-900 rounded-full border border-white shadow-lg cursor-pointer dark:bg-gray-700 transition-all"
      >
        {/* Sun */}
        <div
          className={`absolute top-1 left-2 w-4 h-4 bg-yellow-300 border border-gray-700 rounded-full shadow-lg transform transition-all ${theme === "dark" ? "scale-0 translate-x-10" : "scale-100"}`}
        ></div>

        {/* Moon */}
        <div
          className={`absolute top-1 right-2 w-4 h-4 bg-white rounded-full shadow-lg transform transition-all ${theme === "dark" ? "scale-100" : "scale-0 -translate-x-10"}`}
        ></div>

        {/* Clouds */}
        {theme === "light" &&
          Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className={`absolute right-4 top-2 bg-white rounded-full shadow-md transition-all transform`}
              style={{
                width: `${[16, 16][i]}px`,
                height: `${[8, 8][i]}px`,
                top: `${[16, 6][i]}px`,
                left: `${[44, 32][i]}px`,
                boxShadow: `0 0 10px rgba(255, 255, 255, 0.5)`,
              }}
            ></div>
          ))}

        {/* Stars */}
        {theme === "dark" &&
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`absolute bg-white rounded-full transition-all transform ${theme === "dark" ? "opacity-100 scale-150" : "opacity-0 scale-0"}`}
              style={{
                width: `${[3, 3, 3, 2, 2][i]}px`,
                height: `${[3, 3, 3, 2, 2][i]}px`,
                top: `${[4, 12, 12, 20, 6][i]}px`,
                left: `${[20, 10, 20, 20, 15][i]}px`,
                animation: `twinkle ${1.5 + i * 0.3}s infinite`,
              }}
            ></div>
          ))}
      </button>
    </div>
  );
}
