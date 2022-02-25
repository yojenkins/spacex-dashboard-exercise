import React from "react";

interface Props {
  on: boolean;
  onClick: () => void;
}

export default function Toggle({ on, onClick }: Props) {
  return (
    <div
      className={`w-9 h-4 flex items-center rounded-full py-1 cursor-pointer ${
        on ? "bg-blue-400" : "bg-gray-200"
      }`}
      onClick={onClick}
    >
      {/* Switch */}
      <div
        className={
          "bg-white border border-gray-200 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
          (on ? " transform translate-x-4" : null)
        }
      ></div>
    </div>
  );
}
