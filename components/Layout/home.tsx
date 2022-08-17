import {
  Box,
  Center,
  Title,
  Text,
  Button,
  Space,
  Image,
  Menu,
  Burger,
} from "@mantine/core";
import React, { useState } from "react";
import logo from "../../assets/mysecurenote-logo.png";
import TextLoop from "react-text-loop";
import { phoneWidth, tabletWidth } from "../../helpers";
import { Home, Note, Notes } from "tabler-icons-react";

const HomePage = () => {
  const [burgerOpened, setBurgerOpened] = useState(false);
  return (
    <>
      <Center
        p="1%"
        sx={{
          justifyContent: "space-between",
          position: "sticky",
          width: "100%",
          top: 0,
          [phoneWidth]: { padding: "4%" },
          [tabletWidth]: { padding: "4%" },
          zIndex: 99999,
          background: "#0A1929",
          // opacity: 0.5,
          boxShadow: "0px 0px 3px gray",
        }}
      >
        <Center
          onClick={() =>
            typeof window !== "undefined" &&
            window.scrollTo({ behavior: "smooth", top: 0, left: 0 })
          }
          sx={{ gap: 5, "&:hover": { cursor: "pointer" } }}
        >
          <Image
            src={logo.src}
            sx={{
              width: "60px",
              [phoneWidth]: { width: "30px" },
              [tabletWidth]: { width: "30px" },
            }}
          />
          <Title
            sx={{
              [phoneWidth]: { fontSize: "20px" },
              [tabletWidth]: { fontSize: "20px" },
            }}
          >
            MySecureNote
          </Title>
        </Center>
        <Box
          sx={{
            display: "none",
            [phoneWidth]: { display: "block" },
            [tabletWidth]: { display: "block" },
          }}
        >
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Burger
                color="white"
                opened={burgerOpened}
                onClick={() => setBurgerOpened((o) => !o)}
                title={"Lol"}
              />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={() => {
                  typeof window !== "undefined" &&
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  // setBurgerOpened(false);
                }}
                icon={<Home size={16} strokeWidth={2} color={"black"} />}
              >
                Home
              </Menu.Item>
              <a
                href="/create"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Menu.Item
                  icon={<Notes size={16} strokeWidth={2} color={"black"} />}
                  // icon={<Note size={14} strokeWidth={2} color={"black"} />}
                >
                  Create a note
                </Menu.Item>
              </a>
            </Menu.Dropdown>
          </Menu>
        </Box>
        <Center
          sx={{
            gap: 20,
            [phoneWidth]: { display: "none" },
            [tabletWidth]: { display: "none" },
          }}
        >
          <Title
            sx={{
              "&:hover": { cursor: "pointer" },
            }}
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
              [phoneWidth]: { padding: "3%" },
              [tabletWidth]: { padding: "3%" },
            }}
          >
            <Title
              sx={{
                textAlign: "left",
                margin: "0 auto",
                fontSize: "60px",
                //   fontWeight: 800,
                letterSpacing: 1,
                [phoneWidth]: { fontSize: "34px", marginTop: "2%" },
                [tabletWidth]: { fontSize: "40px", marginTop: "2%" },
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

            <Text
              sx={{
                marginTop: 10,
                [phoneWidth]: { fontSize: "12px", marginTop: 15 },
                [tabletWidth]: { fontSize: "12px", marginTop: 15 },
              }}
              color="dimmed"
            >
              Tons of people are using MySecureNote to upload some notes to the
              public internet for quick access
            </Text>
          </Center>
          <Center sx={{ marginTop: "2%" }}>
            <a href="/cta">
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
