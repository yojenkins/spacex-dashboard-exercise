import { disconnect } from "process";
import React, { FC } from "react";

interface CardCompound {
  Header: FC;
  Body: FC;
}

interface CardProps {
  className?: string;
}

const Card: FC<CardProps> & CardCompound = ({ children, className = "" }) => {
  return (
    <article
      className={`bg-white dark:bg-gray-900 shadow-xl rounded-lg${className}`}
    >
      {children}
    </article>
  );
};

const Header: FC = ({ children }) => {
  return (
    <header className="border-b-4 border-gray-50 dark:border-gray-800 p-5">
      {children}
    </header>
  );
};

const Body: FC = ({ children }) => {
  return <div className="p-5">{children}</div>;
};

Card.Header = Header;
Card.Body = Body;

export default Card;
