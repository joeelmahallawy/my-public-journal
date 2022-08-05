import { Page } from ".prisma/client";
import { Center, Title, Text, Input } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import Router, { useRouter } from "next/router";
import React, { useState } from "react";
import PinInput from "react-pin-input";

const ChangePin = ({ data }: { data: Page }) => {
  const router = useRouter();
  const [pinIsCorrect, setPinIsCorrect] = useState(false);
  const [newPin, setNewPin] = useState("");

  const [showConfirmPinInput, setShowConfirmPinInput] = useState(false);

  return (
    <Center sx={{ flexDirection: "column", padding: "0.5%" }}>
      {pinIsCorrect ? (
        <>
          {showConfirmPinInput ? (
            <>
              <Text mt={5} size="xl" weight={400}>
                Confirm your <span style={{ fontWeight: 800 }}>new </span>
                pin
              </Text>

              <PinInput
                key="confirm-pin"
                length={4}
                //   secret
                initialValue=""
                type="numeric"
                inputMode="number"
                onComplete={async (e) => {
                  if (e === newPin) {
                    const changePin = await fetch(`/api/changePin`, {
                      method: "PUT",
                      body: JSON.stringify({
                        path: data.path,
                        pin: newPin,
                        oldPin: data.pin,
                      }),
                    });
                    const response = await changePin.json();
                    if (!response.error) {
                      router.reload();
                      return showNotification({
                        color: "green",
                        disallowClose: true,
                        message: "Successfully updated pin!",
                      });
                    }
                  } else
                    return showNotification({
                      color: "red",
                      disallowClose: true,
                      message:
                        "Pin entered isn't the same as the previously entered pin",
                    });
                }}
                style={{ marginTop: 20 }}
                inputStyle={{ borderColor: "black" }}
                inputFocusStyle={{
                  borderColor: "blue",
                }}
                autoSelect={true}
                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
              />
            </>
          ) : (
            <>
              <Text mt={5} size="xl" weight={400}>
                Enter your <span style={{ fontWeight: 800 }}>new </span>
                pin
              </Text>

              <PinInput
                key="new-pin"
                length={4}
                initialValue=""
                type="numeric"
                inputMode="number"
                onComplete={(e) => {
                  setNewPin(e);
                  setShowConfirmPinInput(true);
                }}
                style={{ marginTop: 20 }}
                inputStyle={{ borderColor: "black" }}
                inputFocusStyle={{
                  borderColor: "blue",
                }}
                autoSelect={true}
                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
              />
            </>
          )}
        </>
      ) : (
        <>
          <Text mt={5} size="xl" weight={400}>
            Enter your <span style={{ fontWeight: 800 }}>old </span>
            pin
          </Text>

          <PinInput
            key="old-pin"
            length={4}
            initialValue=""
            //   secret
            type="numeric"
            inputMode="number"
            style={{ marginTop: 20 }}
            inputStyle={{ borderColor: "black" }}
            inputFocusStyle={{
              borderColor: "blue",
            }}
            autoSelect={true}
            onComplete={(e) => {
              if (e === data.pin) {
                setPinIsCorrect(true);
                e = "";
              } else
                return showNotification({
                  color: "red",
                  disallowClose: true,
                  message: "Incorrect pin",
                });
            }}
            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
          />
        </>
      )}
    </Center>
  );
};
export default ChangePin;
