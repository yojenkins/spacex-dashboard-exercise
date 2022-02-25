import React from "react";

interface Props {
  size?: string;
  fill?: string;
}
export default function IconMock({ size = "8", fill = "currentColor" }) {
  return (
    <svg
      className="inline-block"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="50" />
    </svg>
  );
}
