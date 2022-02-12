import React, { FC } from "react";

const Text: FC = ({ children }) => {
  return <span className="text-slate-800 dark:text-gray-200">{children}</span>;
};

export default Text;
