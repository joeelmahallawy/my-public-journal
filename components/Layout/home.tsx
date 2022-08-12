import { Box, Center, Title, Text, Button, Space } from "@mantine/core";
import React from "react";
import TextLoop from "react-text-loop";

const HomePage = () => {
  return (
    <>
      <Center
        p="1%"
        sx={{
          justifyContent: "space-between",
          position: "sticky",
          width: "100%",
          top: 0,

          zIndex: 99999,
          background: "#0A1929",
          // opacity: 0.5,
          boxShadow: "0px 0px 3px gray",
        }}
      >
        <Title>MySecureNote (LOGO)</Title>
        <Center sx={{ gap: 20 }}>
          <Title
            sx={{ "&:hover": { cursor: "pointer" } }}
            onClick={() => {
              typeof window !== "undefined" &&
                window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
            }}
            order={4}
          >
            Home
          </Title>

          <a href="/create">
            <Button size="md" radius="xl" sx={{ fontWeight: 700 }}>
              Create notes
            </Button>
          </a>
        </Center>
      </Center>
      <Box pb="1.5%" sx={{ zIndex: 99999 }}>
        <Box>
          <Center
            sx={{
              flexDirection: "column",
              textAlign: "left",
              marginTop: "3%",
              // paddingTop: "5%",
            }}
          >
            <Title
              sx={{
                textAlign: "left",
                margin: "0 auto",
                fontSize: "60px",
                //   fontWeight: 800,
                letterSpacing: 1,
              }}
            >
              Save{" "}
              <TextLoop>
                <span
                  style={{
                    // backgroundImage:
                    //   "linear-gradient(to right,red,orange,purple)",
                    // WebkitTextFillColor: "transparent",
                    // WebkitBackgroundClip: "text",
                    color: "#E08019",
                  }}
                >
                  Phone numbers
                </span>
                <span
                  style={{
                    //   backgroundImage:
                    //     "linear-gradient(to right,red,orange,purple)",
                    //   WebkitTextFillColor: "transparent",
                    //   WebkitBackgroundClip: "text",
                    color: "#E08019",
                  }}
                >
                  QR Codes
                </span>
                <span
                  style={{
                    //   backgroundImage:
                    //     "linear-gradient(to right,red,orange,purple)",
                    //   WebkitTextFillColor: "transparent",
                    //   WebkitBackgroundClip: "text",
                    color: "#E08019",
                  }}
                >
                  Photo ID
                </span>
                {/* <span style={{ color: "red" }}>Public images</span> */}
              </TextLoop>{" "}
              <br />
              publicly to the internet
            </Title>

            <Text sx={{ marginTop: 10 }} color="dimmed">
              Tons of people are using MySecureNote to upload some notes to the
              public internet for quick access
            </Text>
          </Center>

          <Center sx={{ marginTop: "2%" }}>
            <a href="/create">
              <Button radius="xl" size="xl">
                Get started
              </Button>
            </a>
          </Center>
        </Box>
      </Box>
    </>
  );
};
export default HomePage;
