import { Box } from "@mantine/core";
import Head from "next/head";
import React from "react";
import HomePage from "./home";
import Steps from "./steps";
import UseCases from "./usecases";

const Landing = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Box sx={{ background: "#0A1929", color: "white" }}>
        <HomePage />
        <Steps />
        <UseCases />
      </Box>
    </>
  );
};
export default Landing;
