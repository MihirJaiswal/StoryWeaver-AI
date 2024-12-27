"use client";

import React, { useState, useEffect } from "react";

export function ModeToggle() {
  const [isNight, setIsNight] = useState(false);
  const [hasMounted, setHasMounted] = useState(false); // Track mounting

  useEffect(() => {
    setHasMounted(true); 
  }, []);

  useEffect(() => {
    if (hasMounted) {
      document.body.classList.toggle("dark", isNight);
    }
  }, [isNight, hasMounted]);

  if (!hasMounted) return null; // Avoid rendering until after mounting

  return (
    <div className="flex items-center justify-center">
      <label className="relative w-16 h-8 bg-gradient-to-r from-blue-200 to-pink-200 dark:to-purple-600 rounded-full border border-white shadow-lg cursor-pointer dark:bg-gray-700 transition-all">
        <input
          type="checkbox"
          className="hidden"
          checked={isNight}
          onChange={() => setIsNight(!isNight)}
        />
        {/* Sun */}
        <div
          className={`absolute top-1 left-2 w-4 h-4 bg-yellow-300 border border-gray-700 rounded-full shadow-lg transform transition-all ${
            isNight ? "scale-0 translate-x-10" : "scale-100"
          }`}
        ></div>
        {/* Moon */}
        <div    
          className={`absolute top-1 right-2 w-4 h-4 bg-white rounded-full shadow-lg transform transition-all ${
            isNight ? "scale-100" : "scale-0 -translate-x-10"
          }`}
        ></div>
        {/* Clouds */}
        {!isNight &&
          Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className={`absolute right-4 top-2 bg-white rounded-full shadow-md transition-all transform ${
                isNight ? "opacity-0 translate-x-10" : "opacity-100 scale-100"
              }`}
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
        {isNight &&
  Array.from({ length: 5 }).map((_, i) => (
    <div
      key={i}
      className={`absolute bg-white rounded-full transition-all transform ${
        isNight ? "opacity-100 scale-150" : "opacity-0 scale-0"
      }`}
      style={{
        width: `${[3, 3, 3, 2, 2][i]}px`,
        height: `${[3, 3, 3, 2, 2][i]}px`,
        top: `${[4, 12, 12, 20, 6][i]}px`,
        left: `${[20, 10, 20, 20, 15][i]}px`,
        animation: `twinkle ${1.5 + i * 0.3}s infinite`,
      }}
    ></div>
  ))}
      </label>
    </div>
  );
}
