import type { NextPage, GetServerSideProps } from "next";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useQuery } from "@apollo/client";
import { useIntersection } from "react-use";

import { initializeApollo } from "../graphql/client";
import Card from "../components/common/Card";
import SummaryCard from "../components/pages/dashboard/SummaryCard";
import MissionTable from "../components/pages/dashboard/MissionTable";
import { H1, H2, Text } from "../components/common/typography";
import SettingsToggle from "../components/pages/dashboard/SettingsToggle";
import {
  DashboardGraphsDocument,
  LaunchesDocument,
} from "../graphql/generated";
import { useDerivedPayloadsData } from "./index.hooks";
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
    }
  }, [intersection]);

  const { data: graphsData } = useQuery(DashboardGraphsDocument, {
    fetchPolicy: "cache-only",
  });

  const { averagePayloadSize, uniquePayloadCustomers, countByNationality } =
    useDerivedPayloadsData(graphsData?.payloads);

  if (!data) return null;

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <header className="flex py-11">
        <H1>SpaceX Mission Dashboard</H1>
        <div className="ml-auto">
          <SettingsToggle />
        </div>
      </header>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mt-4">
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

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 mt-4">
        <PayloadsByNationality data={countByNationality} />

        <MissionsByPayloadMass />
      </div>

      <div className="mt-4">
        <Card>
          <Card.Header>
            <H2>SpaceX Launch Data</H2>
          </Card.Header>

          <MissionTable data={data.launches} loading={loading} />
          <div ref={paginationRef} style={{ height: "2rem" }} />
        </Card>
      </div>
    </div>
  );
};

export default Home;
