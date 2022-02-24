import React, { FC, ReactNode } from "react";
import { Text } from "../../common/typography";

interface Props {
  icon: ReactNode;
  title: string;
  metric: string;
}

const SummaryCard: FC<Props> = ({ icon, title, metric }) => {
  return (
    <article className="rounded-lg bg-gray-200 dark:bg-gray-900 flex p-4 pb-3.5 items-center">
      <div className="flex items-top">
        <div className="mr-2">{icon}</div>
        <div>
          <Text className="block text-xl leading-none -mb-0.5 font-bold text-gray-900">
            {metric}
          </Text>
          <span className="text-sm font-medium text-gray-400 dark:text-gray-400">{title}</span>
        </div>
      </div>
      <span className="ml-auto">></span>
    </article>
  );
};

export default SummaryCard;
