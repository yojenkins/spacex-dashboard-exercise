import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  LegendProps,
} from "recharts";

import Card from "../../common/Card";
import { Heading, Text } from "../../common/typography";
import { DashboardGraphsQuery } from "../../../graphql/generated";

interface NationalityCount {
  name: string;
  count: number;
}
type Props = {
  data: NationalityCount[];
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#F0F043"];

function PayloadsByNationality({ data }: Props) {
  return (
    <Card>
      <Card.Header>
        <Heading>Payload Count by Nationality</Heading>
      </Card.Header>
      <Card.Body>
        <div className="flex items-center">
          <div className="w-64">
            <ResponsiveContainer width={"99%"} height={299}>
              <PieChart>
                <Pie
                  outerRadius={80}
                  innerRadius={75}
                  data={data.slice(0, 5)}
                  nameKey="name"
                  dataKey="count"
                  paddingAngle={5}
                  cornerRadius={10}
                >
                  {data.map((entry, index) => (
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
            <ul>
              <li className="py-2 flex">
                <div className="w-64">
                  <Text className="uppercase">Nationality</Text>
                </div>
                <div className="flex-1">
                  <Text className="uppercase">Value</Text>
                </div>
              </li>
              {data.slice(0, 5).map(({ name, count }, index) => (
                <li
                  className={`${index !== 0 ? "border-t-2" : ""} py-2 flex`}
                  key={name}
                >
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

                    <Text>{name}</Text>
                  </div>
                  <div className="flex-1">
                    <Text>{count}</Text>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PayloadsByNationality;
