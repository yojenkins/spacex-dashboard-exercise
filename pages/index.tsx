import type { NextPage, GetServerSideProps } from "next";
// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import React, { useEffect, useMemo, useRef } from "react";
import { useQuery } from "@apollo/client";
import { useIntersection } from "react-use";

import { initializeApollo } from "../graphql/client";
import Card from "../components/common/Card";
import SummaryCard from "../components/pages/dashboard/SummaryCard";
import MissionTable from "../components/pages/dashboard/MissionTable";
import { Text, Heading } from "../components/common/typography";
import {
  DashboardGraphsDocument,
  LaunchesDocument,
} from "../graphql/generated";
import { useDerivedPayloadsData, useDerivedMissionsData } from "./index.hooks";
import PayloadsByNationality from "../components/pages/dashboard/PayloadsByNationality";
import MissionsByPayloadMass from "../components/pages/dashboard/MissionsByPayloadMass";

export const getServerSideProps: GetServerSideProps = async () => {
  const client = initializeApollo();
  await client.query({
    query: LaunchesDocument,
    variables: {
      limit: 10,
      offset: 0,
    },
  });

  await client.query({
    query: DashboardGraphsDocument,
  });

  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
  };
};

const Home: NextPage = () => {
  const { data, fetchMore, loading } = useQuery(LaunchesDocument, {
    notifyOnNetworkStatusChange: true,
  });

  console.log((data?.launches ?? []).map((m) => m?.mission_name));

  const paginationRef = useRef(null);
  const intersection = useIntersection(paginationRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  //todo extract the pagination obeserver to hooks file
  useEffect(() => {
    if (intersection && intersection.intersectionRatio === 1) {
      fetchMore({
        variables: {
          limit: 10,
          offset: (data?.launches?.length ?? 0) + 10,
        },
      });
      console.log("firing useEffect");
    }
  }, [intersection]);

  const { data: graphsData } = useQuery(DashboardGraphsDocument, {
    fetchPolicy: "cache-only",
  });

  const { averagePayloadSize, uniquePayloadCustomers, countByNationality } =
    useDerivedPayloadsData(graphsData?.payloads);

  if (!data) return null;

  console.log({
    averagePayloadSize,
    uniquePayloadCustomers,
    countByNationality,
  });

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <div className="md:grid gap-4 grid-cols-3 mt-3">
        <SummaryCard
          icon={<span>i</span>}
          title="Total Payloads"
          metric={graphsData?.payloads?.length.toString() ?? "0"}
        />
        <SummaryCard
          icon={<span>i</span>}
          title="Avg. Payload Mass"
          metric={`${averagePayloadSize.toString()} Kg`}
        />
        <SummaryCard
          icon={<span>i</span>}
          title="Total Payload Customers"
          metric={uniquePayloadCustomers.toString()}
        />
      </div>

      <div className="md:grid gap-4 grid-cols-2 mt-3">
        <PayloadsByNationality data={countByNationality} />
        <MissionsByPayloadMass />
      </div>

      <div className="mt-3">
        <Card>
          <Card.Header>
            <Heading>SpaceX Launch Data</Heading>
          </Card.Header>

          {/* <button>Animate toggle</button> */}
          <MissionTable data={data.launches} loading={loading} />
          <div ref={paginationRef} style={{ height: "2rem" }} />
        </Card>
      </div>
    </div>
  );
};

export default Home;
