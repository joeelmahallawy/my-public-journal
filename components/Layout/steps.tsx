import {
  Center,
  Image,
  Title,
  Text,
  Space,
  List,
  Box,
  Stepper,
} from "@mantine/core";
import React from "react";
import demo from "../../assets/demo.png";
import { phoneWidth, tabletWidth } from "../../helpers";

const Steps = () => {
  return (
    <Box
      //   p="3% 5% 3% 5%"
      p={0}
      sx={{
        flexDirection: "column",
        marginTop: "3%",
        [phoneWidth]: {
          paddingBottom: "2%",
          marginTop: "5%",
        },
        [tabletWidth]: {
          paddingBottom: "2%",
          marginTop: "5%",
        },
      }}
    >
      <Title
        p="0 3% 3%"
        sx={{
          fontWeight: 900,

          textAlign: "left",
          [phoneWidth]: { fontSize: "18px" },
          [tabletWidth]: { fontSize: "18px" },
        }}
      >
        <span style={{ color: "red" }}>Problem: </span>
        <span style={{ fontWeight: 400 }}>
          Tired of logging in to apps to get access to some private file, image,
          or info?
        </span>
        <Space h="sm" />
        <span style={{ color: "#19E043" }}>Solution: </span>
        <span style={{ fontWeight: 400 }}>
          Upload them to a pin-protected public URL and get access to it from
          any device.
        </span>
      </Title>
      <Box
        p="3% 3%"
        sx={{
          background: "white",
          color: "black",
          width: "100%",
          //   marginTop: "3%",
          [phoneWidth]: { marginTop: "5%" },
          [tabletWidth]: { marginTop: "5%" },
        }}
      >
        <Box
          mr="auto"
          sx={{
            width: "35%",
            [phoneWidth]: { width: "80%" },
            [tabletWidth]: { width: "80%" },
          }}
        >
          <Title
            sx={{
              fontSize: "48px",
              [phoneWidth]: { fontSize: "30px" },
              [tabletWidth]: { fontSize: "30px" },
            }}
          >
            A quick and{" "}
            <span
              style={{
                // backgroundImage: "linear-gradient(35deg, #7950f2 0%, #e64980 100%)",
                backgroundImage:
                  "linear-gradient(35deg, orange 0%, #e64980 100%)",
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
              }}
            >
              simple{" "}
            </span>
            <br />
            set-up process
          </Title>
          <Text size="xl" color="dimmed">
            Built for the average human being
          </Text>
        </Box>
        <Center
          sx={{
            margin: "0 auto",
            marginTop: "5%",
            width: "100%",
          }}
        >
          {/* <Center sx={{ flexDirection: "column", gap: 10 }}>
            <Center
              sx={{
                width: 42,
                height: 42,
                borderRadius: "100%",
                background: "#f1f3f5",
                fontWeight: 600,
              }}
            >
              1
            </Center>
            <Text>Pick a username and pin</Text>
          </Center>
          <Center sx={{ flexDirection: "column", gap: 10 }}>
            <Center
              sx={{
                width: 42,
                height: 42,
                borderRadius: "100%",
                background: "#f1f3f5",
                fontWeight: 600,
              }}
            >
              2
            </Center>
            <Text>Pick a username and pin</Text>
          </Center>
          <Center sx={{ flexDirection: "column", gap: 10 }}>
            <Center
              sx={{
                width: 42,
                height: 42,
                borderRadius: "100%",
                background: "#f1f3f5",
                fontWeight: 600,
              }}
            >
              3
            </Center>
            <Text>Pick a username and pin</Text>
          </Center> */}

          <Stepper sx={{ width: "100%" }} active={0} breakpoint="sm">
            <Stepper.Step
              label="First step"
              description="Pick a username and pin to get a URL"
            />
            <Stepper.Step
              label="Second step"
              //   description="Upload photos, QR codes, or emergency contacts"
              description="Upload text and photos"
            />
            <Stepper.Step
              label="Third step"
              description="Access your data from anywhere"
            />
          </Stepper>
        </Center>
        <Center
          mt="5%"
          sx={{
            [phoneWidth]: { marginBottom: "5%", marginTop: "7.5%" },
            [tabletWidth]: { marginBottom: "5%", marginTop: "7.5%" },
          }}
        >
          <a href="/create">
            <Image
              p={10}
              pt={20}
              src={demo.src}
              sx={{
                border: "0.5px solid gray",
                borderRadius: 10,
                [phoneWidth]: { width: "300px" },
                [tabletWidth]: { width: "300px" },
                width: 600,
              }}
              //   width={600}
            />
          </a>
        </Center>
      </Box>
    </Box>
  );
};
export default Steps;
