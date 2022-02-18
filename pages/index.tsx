import type { NextPage, GetServerSideProps } from "next";
// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import React from "react";
import { gql, useQuery } from "@apollo/client";

import { initializeApollo } from "../graphql/client";
import Card from "../components/common/Card";
import SummaryCard from "../components/pages/dashboard/SummaryCard";
import MissionTable from "../components/pages/dashboard/MissionTable";
import { Text, Heading } from "../components/common/typography";
import { LaunchesDocument, LaunchesQuery } from "../graphql/generated";

export const getServerSideProps: GetServerSideProps = async () => {
  const client = initializeApollo();
  await client.query({
    query: LaunchesDocument,
  });

  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
  };
};

const Home: NextPage = () => {
  const { data } = useQuery(LaunchesDocument);

  if (!data) return null;
  console.log(data.launches);
  return (
    <div className="p-4">
      <div className="md:grid gap-4 grid-cols-3 mt-3">
        <SummaryCard
          icon={<span>i</span>}
          title="Total Payloads"
          metric="310"
        />
        <SummaryCard
          icon={<span>i</span>}
          title="Avg. Payload Mass"
          metric="2120 Kg"
        />
        <SummaryCard
          icon={<span>i</span>}
          title="Total Payload Customers"
          metric="43"
        />
      </div>

      <div className="md:grid gap-4 grid-cols-2 mt-3">
        <Card>
          <Card.Header>
            <Heading>Payload Count by Nationality</Heading>
          </Card.Header>
          <Card.Body>
            <Text>Hello old chap</Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <Heading>Top 5 Missions</Heading>
          </Card.Header>
          <Card.Body>
            <Text>Hello old chap</Text>
          </Card.Body>
        </Card>
      </div>

      <div className="mt-3">
        <Card>
          <Card.Header>
            <Heading>SpaceX Launch Data</Heading>
          </Card.Header>

          {/* <button>Animate toggle</button> */}
          <MissionTable data={data.launches} />
        </Card>
      </div>
    </div>
  );
};

export default Home;
