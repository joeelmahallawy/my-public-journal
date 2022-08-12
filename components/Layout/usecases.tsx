import { Box, Center, List, Text, Title, Divider, Image } from "@mantine/core";
import demo from "../../assets/demo.png";
import React from "react";

const UseCases = () => {
  return (
    <Box>
      <Box p="3% 3% 0">
        <Title sx={{ fontSize: "50px", fontWeight: 800 }} mb={10}>
          Use cases:
        </Title>
        <Title order={2}>
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
        <Center p="2%" sx={{ justifyContent: "space-between" }}>
          <Text>(LOGO HERE)</Text>
          <Text>&copy; Copyright 2022</Text>
          <a
            style={{ color: "white", textDecoration: "none" }}
            href="mailto:youssef.elmahallawy01@gmail.com"
          >
            Contact
          </a>
        </Center>
      </Box>
    </Box>
  );
};
export default UseCases;
