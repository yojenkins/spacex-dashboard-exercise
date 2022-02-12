import React, { FC } from "react";

const Heading: FC = ({ children }) => {
  return <h1 className="text-xl text-black dark:text-white">{children}</h1>;
};

export default Heading;
