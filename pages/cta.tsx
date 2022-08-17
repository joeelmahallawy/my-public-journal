import { IconCheck, IconX } from "@tabler/icons";
import { Lock } from "tabler-icons-react";
import {
  Notification,
  Box,
  Center,
  Input,
  Title,
  Text,
  Textarea,
  Alert,
  Button,
  Anchor,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import React, { useState } from "react";
import { getEnvironmentURL, phoneWidth, tabletWidth } from "../helpers";
import { useForm } from "@mantine/form";
import PinInput from "react-pin-input";
import Head from "next/head";
import HomePage from "../components/Layout/home";
import Landing from "../components/Layout";

const CTA = () => {
  const [personalURL, setPersonalURL] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  return (
    <>
      <Head>
        <title>Action page</title>
      </Head>

      <Center sx={{ flexDirection: "column", width: "100%", height: "75vh" }}>
        {showSearch ? (
          <Box
            sx={{
              [phoneWidth]: { width: "80%" },
              [tabletWidth]: { width: "80%" },
              width: "30%",
            }}
          >
            <Center sx={{ gap: 5 }}>
              <TextInput
                placeholder="e.g. johndoe123"
                onChange={(e) => {
                  setPersonalURL(e.currentTarget.value);
                }}
                autoCapitalize="off"
                autoComplete="off"
                // autoFocus

                autoCorrect="off"
                spellCheck="false"
                description="This is the username you set when you first created your note"
                label="Your username"
              />
              {personalURL && (
                <Anchor
                  mt="auto"
                  href={`${getEnvironmentURL()}/${personalURL}`}
                >
                  <Button>Go</Button>
                </Anchor>
              )}
            </Center>
            {/* <Anchor href={`${getEnvironmentURL()}/${personalUrl}`}>
                  {getEnvironmentURL().replace("https://www.", "")}/{personalUrl}
                </Anchor> */}
          </Box>
        ) : (
          <>
            <Title
              sx={{
                [tabletWidth]: { fontSize: "30px" },
                [phoneWidth]: { fontSize: "24px" },
              }}
            >
              What would you like to do?
            </Title>
            <Center
              sx={{
                gap: 10,
                [phoneWidth]: { marginTop: "2.5%" },
                [tabletWidth]: { marginTop: "3%" },
              }}
              mt="1%"
            >
              <Button onClick={() => setShowSearch(true)}>Check my note</Button>
              <a href="/create">
                <Button color="green">Create a new note</Button>
              </a>
            </Center>
          </>
        )}
      </Center>
    </>
  );
};
export default CTA;
