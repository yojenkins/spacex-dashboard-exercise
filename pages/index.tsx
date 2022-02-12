import type { NextPage, GetServerSideProps } from "next";
// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import React, { useState } from "react";
import Link from "next/link";

import Card from "../components/common/Card";
import { Text, Heading } from "../components/common/typography";

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {},
  };
};

type Props = {};

const Home: NextPage<Props> = ({}) => {
  return (
    <div className="p-4">
      <div className="md:grid gap-4 grid-cols-3 mt-3">
        <Card>
          <Card.Body>
            <Text>Hello old chap</Text>
          </Card.Body>
        </Card>

        <Card>
          <Heading>Header Text</Heading>
          <Text>Hello old chap</Text>
        </Card>

        <Card>
          <Heading>Header Text</Heading>
          <Text>Hello old chap</Text>
        </Card>
      </div>

      <div className="md:grid gap-4 grid-cols-2 mt-3">
        <Card>
          <Card.Header>
            <Heading>Header Text</Heading>
          </Card.Header>
          <Card.Body>
            <Text>Hello old chap</Text>
          </Card.Body>
        </Card>

        <Card>
          <Heading>Header Text</Heading>
          <Text>Hello old chap</Text>
        </Card>
      </div>

      <div className="mt-3">
        <Card>
          <Card.Body>
            <button>Animate toggle</button>
            <Text>Card Table</Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Home;
