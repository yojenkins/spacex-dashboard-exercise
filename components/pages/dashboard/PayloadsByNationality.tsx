import React from "react";

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

function PayloadsByNationality({ data }: Props) {
  return (
    <Card>
      <Card.Header>
        <Heading>Payload Count by Nationality</Heading>
      </Card.Header>
      <Card.Body>
        <Text>Hello old chap</Text>
      </Card.Body>
    </Card>
  );
}

export default PayloadsByNationality;
