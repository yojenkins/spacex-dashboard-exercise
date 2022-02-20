import React, { useMemo } from "react";
import { useTable } from "react-table";

import { Launch, LaunchesQuery } from "../../../graphql/generated";
import { Text } from "../../common/typography";

type Props = {
  data: LaunchesQuery["launches"];
  loading: boolean;
};

const sumPayloads = (row: Launch) => {
  const payloads = row.rocket?.second_stage?.payloads;
  if (!payloads) return "0 kg";

  const sum = payloads.reduce((total, payload) => {
    const val = payload?.payload_mass_kg ?? 0;
    return (total += val);
  }, 0);
  return `${sum} kg`;
};

const Success = () => <span className="text-green-500">Success</span>;
const Failure = () => <span className="text-red-500">Failure</span>;

const MissionTable = ({ data, loading }: Props) => {
  const mappedData: NonNullable<Props["data"]> = useMemo(
    () => data?.filter((x) => !!x) ?? [],
    [data]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Mission Name",
        accessor: "mission_name",
      },
      {
        Header: "Date",
        accessor: "launch_date_local",
      },
      {
        Header: "Outcome",
        accessor: (d: Launch) => (d.launch_success ? <Success /> : <Failure />),
      },
      {
        Header: "Rocket",
        accessor: "rocket.rocket_name",
      },
      {
        Header: "Payload Mass",
        accessor: sumPayloads,
      },
      {
        Header: "Site",
        accessor: "launch_site.site_name",
      },
      {
        Header: "Mission ID",
        accessor: "mission_id",
      },
    ],
    []
  );

  const tableInstance = useTable<Launch>({
    columns,
    data: mappedData,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <div className="max-w-full">
      <div className="max-w-full overflow-x-scroll overflow-y-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((group) => (
              <tr {...group.getHeaderGroupProps()} className="text-left">
                {group.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="pt-3 pb-2 px-6">
                    <Text>{column.render("Header")}</Text>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="py-3 px-6 border-t-2 border-gray-50 dark:border-gray-800"
                    >
                      <Text>{cell.render("Cell")}</Text>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {loading && <div className="text-center p-4">Loading...</div>}
      </div>
    </div>
  );
};

export default MissionTable;
