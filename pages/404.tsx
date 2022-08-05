import { Box, Button, Center, Title, Text } from "@mantine/core";
import Head from "next/head";
import React from "react";
import { phoneWidth, tabletWidth } from "../helpers";

const Error404 = () => {
  return (
    <>
      <Head>
        <title>Page not found</title>
      </Head>
      <Center sx={{ width: "100%", height: "75vh" }}>
        <Center
          sx={{
            flexDirection: "column",
            [phoneWidth]: { width: "80%" },
            [tabletWidth]: { width: "75%" },
          }}
        >
          <Title>Page not found </Title>
          <Text
            mt={5}
            sx={{ width: "100%", textAlign: "center" }}
            color="dimmed"
          >
            This url doesn't belong to anyone, which means you entered the wrong
            username.
          </Text>
          <a style={{ marginTop: 15 }} href="/">
            <Button>Try again</Button>
          </a>
        </Center>
      </Center>
    </>
  );
};
export default Error404;
