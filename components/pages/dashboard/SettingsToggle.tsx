import React, { useState, useCallback } from "react";

import { Text } from "../../common/typography";
import Toggle from "../../common/Toggle";

export default function SettingsToggle() {
  const [displayMode, setDisplayMode] = useState("light");
  const [displaySettings, setDisplaySettings] = useState(false);
  const toggleMode = useCallback(() => {
    setDisplayMode((m) => (m === "light" ? "dark" : "light"));
    document.documentElement.classList.toggle("dark");
  }, []);

  return (
    <div className="relative">
      <button
        className={`flex items-center justify-center rounded-full dark:text-white shadow h-8 w-8 ${
          displaySettings
            ? "bg-blue-400 hover:bg-blue-500 text-white"
            : "bg-white dark:bg-gray-700 hover:bg-gray-100"
        }`}
        onClick={() => setDisplaySettings(!displaySettings)}
      >
        <svg
          className="inline-block"
          viewBox="0 0 100 100"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            stroke-width="10"
            fill="none"
          />
        </svg>
      </button>
      <div
        className={`absolute top-10 right-0 transform transition-all pointer-events-none duration-300 opacity-1 ${
          displaySettings ? "translate-y-0" : "-translate-y-3 opacity-0"
        }`}
      >
        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg w-56">
          <ul className="text-sm pointer-events-auto">
            <li className="px-4 py-3 flex items-center">
              <Text>Light/Dark Theme</Text>
              <div className="ml-auto">
                <Toggle on={displayMode === "dark"} onClick={toggleMode} />
              </div>
            </li>
            <li className="px-4 py-3 border-t-2 border-gray-50 dark:border-gray-800">
              <Text>Logout</Text>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
