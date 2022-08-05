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
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import React, { useState } from "react";
import { getEnvironmentURL, phoneWidth, tabletWidth } from "../helpers";
import { useForm } from "@mantine/form";
import PinInput from "react-pin-input";
import Head from "next/head";

const CreatePage = () => {
  const form = useForm({
    initialValues: {
      path: "",
      body: "",
      pin: "",
    },
  });

  const [finalPath, setFinalPath] = useState("");

  const [hasSubmitted, sethasSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Create a page</title>
      </Head>
      <Center sx={{ flexDirection: "column" }}>
        <Box
          mt={10}
          sx={{
            width: "45%",
            [tabletWidth]: { width: "80%" },
            [phoneWidth]: { width: "85%" },
          }}
        >
          <Title
            sx={{
              textAlign: "center",
              [tabletWidth]: { fontSize: "30px" },
              [phoneWidth]: { fontSize: "24px" },
            }}
          >
            Create your own secure note
          </Title>
          <Text
            color="dimmed"
            size="sm"
            sx={{ textAlign: "center", [phoneWidth]: { fontSize: "12px" } }}
          >
            Save some of your most urgent contacts/info in a url that you'll
            easily remember
          </Text>
          <form
            onSubmit={form.onSubmit(async (values) => {
              setIsLoading(true);
              if (values.pin.length !== 4) {
                setIsLoading(false);
                return showNotification({
                  color: "red",
                  disallowClose: true,
                  message: "Please enter a 4 number pin",
                });
              }

              const sendData = await fetch(`/api/saveData`, {
                method: "POST",
                body: JSON.stringify(values),
              });
              const response = await sendData.json();
              if (response.error) {
                setIsLoading(false);
                return showNotification({
                  color: "red",
                  disallowClose: true,
                  message: response.error,
                });
              }

              setIsLoading(false);
              sethasSubmitted(true);
              setFinalPath(values.path);
              return showNotification({
                color: "green",
                disallowClose: true,
                message: "Successfully created path!",
              });
            })}
          >
            {/* <Input.Wrapper mt={10} id="firstName" label="First name" required>
            <Input
              required
              id="firstName"
              placeholder="e.g. John"
              {...form.getInputProps("firstName")}
            />
          </Input.Wrapper>
          <Input.Wrapper
            description="In case you forget your pin, we'll email you a reset link."
            mt={10}
            id="email-backup"
            label="Email (optional)"
          >
            <Input
              required
              id="email-backup"
              placeholder="johndoe@gmail.com"
              {...form.getInputProps("email")}
            />
          </Input.Wrapper> */}

            <Input.Wrapper
              //   description="Something you'll remember (we recommend your full name)"
              mt={5}
              id="path"
              label="Username"
              required
            >
              <Input
                required
                id="path"
                placeholder="e.g. johndoe123"
                {...form.getInputProps("path")}
              />
            </Input.Wrapper>
            {form.values.path.includes(" ") && (
              <Text mt={3} size="xs" color="red">
                Cannot have a space in your url
              </Text>
            )}
            <Alert mt={10} color="green">
              <Text weight={700} size="md">
                Your current url:{" "}
                <span style={{ fontWeight: 700 }}>
                  {getEnvironmentURL()}/{form.values.path}
                </span>
              </Text>
            </Alert>
            <Textarea
              autosize
              {...form.getInputProps("body")}
              mt={10}
              placeholder="John Doe: 415-XXX-XXXX"
              description={
                <Center sx={{ justifyContent: "flex-start", gap: 1 }}>
                  {/* <Lock size={14} strokeWidth={2.5} /> */}
                  <Text color="dimmed" sx={{ alignItems: "center" }}>
                    {/* Anything you save here will be fully encrypted.  */}
                    Maybe some friends phone numbers in case your phone dies
                  </Text>
                </Center>
              }
              label="Your notes"
              required
            />
            <Center mt={3} sx={{ justifyContent: "flex-start", gap: 1 }}>
              <Text size="xs" color="dimmed" sx={{ alignItems: "center" }}>
                <Lock size={10} strokeWidth={2.5} />
                Anything you save here will be fully encrypted
              </Text>
            </Center>

            <Input.Wrapper mt={10} id="pin" label="Pin" required>
              <PinInput
                id="pin"
                length={4}
                initialValue=""
                // secret
                {...form.getInputProps("pin")}
                type="numeric"
                inputMode="number"
                inputStyle={{ borderColor: "black" }}
                inputFocusStyle={{ borderColor: "blue" }}
                autoSelect={true}
                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
              />
            </Input.Wrapper>
            <Center sx={{ justifyContent: "flex-end" }}>
              <Button
                disabled={form.values.path.includes(" ")}
                loading={isLoading}
                type="submit"
                mt={10}
                ml="auto"
              >
                Save
              </Button>
            </Center>
          </form>
          {hasSubmitted && (
            <Notification
              mt={10}
              icon={<IconCheck size={18} />}
              color="teal"
              disallowClose
              title="You have created a new note"
            >
              Here's your url:{" "}
              <Anchor href={`${getEnvironmentURL()}/${finalPath}`}>
                {getEnvironmentURL()}/{finalPath}
              </Anchor>
            </Notification>
          )}
        </Box>
      </Center>
    </>
  );
};

export default CreatePage;
