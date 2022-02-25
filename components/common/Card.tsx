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
      className={`bg-white dark:bg-gray-750 shadow-xl rounded-lg${className}`}
    >
      {children}
    </article>
  );
};

const CardHeader: FC = ({ children }) => {
  return (
    <header className="border-b-4 border-gray-50 dark:border-gray-775 py-4 px-6">
      {children}
    </header>
  );
};

const CardBody: FC = ({ children }) => {
  return <div className="p-5">{children}</div>;
};

Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;
