import { Box, Center, List, Text, Title, Divider, Image } from "@mantine/core";
import demo from "../../assets/demo.png";
import React from "react";
import logo from "../../assets/mysecurenote-logo.png";
import { phoneWidth, tabletWidth } from "../../helpers";

const UseCases = () => {
  return (
    <Box>
      <Box
        p="3% 3% 0"
        sx={{
          [phoneWidth]: { paddingBottom: "3%" },
          [tabletWidth]: { paddingBottom: "3%" },
        }}
      >
        <Title
          sx={{
            fontSize: "50px",
            fontWeight: 800,
            [phoneWidth]: { fontSize: "36px", padding: "3%" },
            [tabletWidth]: { fontSize: "36px", padding: "3%" },
          }}
          mb={10}
        >
          Use cases:
        </Title>
        <Title
          sx={{
            [phoneWidth]: { fontSize: "18px" },
            [tabletWidth]: { fontSize: "18px" },
          }}
          order={2}
        >
          <List.Item>
            Phone died and you need to call your friend
            <List withPadding listStyleType="disc">
              <Title sx={{ color: "#B0B0B0" }} order={5}>
                <List.Item>
                  Save their number, and get it from any device
                </List.Item>

                {/* <List.Item>Check it from a person's phone</List.Item> */}
                {/* <List.Item>Call them</List.Item> */}
              </Title>
            </List>
          </List.Item>
          <List.Item>
            Don't want to carry your ID
            <List withPadding listStyleType="disc">
              <Title sx={{ color: "#B0B0B0" }} order={5}>
                <List.Item>
                  Upload your photo ID and use it when needed
                </List.Item>
                {/* <List.Item>Use it when needed</List.Item> */}
              </Title>
            </List>
          </List.Item>
          <List.Item>
            Get access to QR codes from any device
            <List withPadding listStyleType="disc">
              <Title sx={{ color: "#B0B0B0" }} order={5}>
                <List.Item>
                  Upload QR codes online so that you don't need to worry about
                  saving it on a specific device
                </List.Item>
                {/* <List.Item>Use it when needed</List.Item> */}
              </Title>
            </List>
          </List.Item>
          <List.Item>
            Personal public vault
            <List withPadding listStyleType="disc">
              <Title sx={{ color: "#B0B0B0" }} order={5}>
                <List.Item>
                  Save whatever you want and show your friends your personal
                  vault
                </List.Item>
                {/* <List.Item>Use it when needed</List.Item> */}
              </Title>
            </List>
          </List.Item>
        </Title>
      </Box>
      <Box mt="3%" sx={{ width: "100%" }}>
        <Divider />
        <Center
          p="2%"
          sx={{
            justifyContent: "space-between",
            [phoneWidth]: { fontSize: "12px" },
            [tabletWidth]: { fontSize: "12px" },
          }}
        >
          {/* <Text>(LOGO HERE)</Text> */}
          <Center
            sx={{ "&:hover": { cursor: "pointer" }, gap: 5 }}
            onClick={() =>
              typeof window !== "undefined" &&
              window.scrollTo({ behavior: "smooth", top: 0, left: 0 })
            }
          >
            <Image
              src={logo.src}
              sx={{
                [phoneWidth]: { width: "18px" },
                [tabletWidth]: { width: "18px" },
                width: "40px",
              }}
            />
            MySecureNote
          </Center>
          <Text>&copy; Copyright 2022</Text>
          <a
            style={{ color: "white", textDecoration: "none" }}
            href="mailto:youssef.elmahallawy01@gmail.com"
          >
            Contact us
          </a>
        </Center>
      </Box>
    </Box>
  );
};
export default UseCases;
