import type { NextPage, GetServerSideProps } from "next";
// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import React, { useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { useIntersection } from "react-use";

import { initializeApollo } from "../graphql/client";
import Card from "../components/common/Card";
import SummaryCard from "../components/pages/dashboard/SummaryCard";
import MissionTable from "../components/pages/dashboard/MissionTable";
import { Text, Heading } from "../components/common/typography";
import { LaunchesDocument } from "../graphql/generated";

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
  const { data, fetchMore, loading } = useQuery(LaunchesDocument, {
    notifyOnNetworkStatusChange: true,
  });

  const paginationRef = useRef(null);
  const intersection = useIntersection(paginationRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  useEffect(() => {
    if (intersection && intersection.intersectionRatio === 1) {
      console.log("firing useEffect");
    }
  }, [intersection]);

  if (!data) return null;

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
          <div ref={paginationRef} style={{ height: "2rem" }} />
        </Card>
      </div>
    </div>
  );
};

export default Home;
