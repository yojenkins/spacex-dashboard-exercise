import React, { FC } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RCTooltip,
  TooltipProps,
} from "recharts";

import Card from "../../common/Card";
import { H2, Text } from "../../common/typography";

interface NationalityCount {
  name: string;
  count: number;
}
type Props = {
  data: NationalityCount[];
};

const COLORS = ["#f97316", "#b91c1c", "#14b8a6", "#3b82f6", "#6d28d9"];

export default function PayloadsByNationality({ data }: Props) {
  return (
    <Card>
      <Card.Header>
        <H2>Payload Count by Nationality</H2>
      </Card.Header>
      <Card.Body>
        <div className="flex items-center">
          <div className="w-64">
            <ResponsiveContainer width="100%" height={275}>
              <PieChart>
                <RCTooltip content={<Tooltip />} />
                <Pie
                  outerRadius={80}
                  innerRadius={75}
                  data={data.slice(0, 5)}
                  nameKey="name"
                  dataKey="count"
                  paddingAngle={5}
                  cornerRadius={10}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1">
            <Legend data={data.slice(0, 5)} />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

const Tooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 dark:bg-gray-50 p-2 rounded-md">
        <span className="text-xs text-gray-50 dark:text-gray-900">{`${payload[0].name} ${payload[0].value}`}</span>
      </div>
    );
  }

  return null;
};

const LegendHeading: FC = ({ children }) => (
  <Text className="text-xs uppercase font-display">{children}</Text>
);

const Legend = ({ data }: Props) => {
  return (
    <ul>
      <li className="py-2 flex">
        <div className="w-64">
          <LegendHeading>Nationality</LegendHeading>
        </div>
        <div className="flex-1">
          <LegendHeading>Value</LegendHeading>
        </div>
      </li>
      {data.slice(0, 5).map((row, index) => (
        <LegendItem row={row} index={index} key={row.name} />
      ))}
    </ul>
  );
};

const LegendItem = ({
  row,
  index,
}: {
  row: NationalityCount;
  index: number;
}) => {
  const { name, count } = row;
  const firstItemCls = "border-t-2 border-gray-50 dark:border-gray-775";

  return (
    <li className={`${index !== 0 && firstItemCls} py-2 flex`}>
      <div className="w-64">
        <svg
          className="inline-block mr-2"
          viewBox="0 0 100 100"
          width="8"
          height="8"
          fill={COLORS[index]}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>

        <Text className="text-sm">{name}</Text>
      </div>
      <div className="flex-1">
        <Text className="text-sm">{count}</Text>
      </div>
    </li>
  );
};
