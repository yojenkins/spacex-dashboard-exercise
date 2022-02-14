import React, { FC } from "react";

interface Props {
  className?: string;
}

const Text: FC<Props> = ({ children, className = "" }) => {
  return (
    <span className={`text-gray-800 dark:text-gray-200 ${className}`}>
      {children}
    </span>
  );
};

export default Text;
