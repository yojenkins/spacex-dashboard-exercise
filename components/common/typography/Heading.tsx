import React, { FC } from "react";

const baseClasses = "text-gray-900 dark:text-white font-display font-bold";

const H1: FC = ({ children }) => {
  return <h1 className={`${baseClasses} text-2xl`}>{children}</h1>;
};

const H2: FC = ({ children }) => {
  return <h2 className={`${baseClasses} text-xl`}>{children}</h2>;
};

export { H1, H2 };
