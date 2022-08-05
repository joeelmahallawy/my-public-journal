import { Page } from ".prisma/client";
import { Input, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React from "react";
import PinInput from "react-pin-input";
import { phoneWidth, tabletWidth } from "../helpers";

const EnterPin = ({
  path,
  setPinIsCorrect,
  setData,
  setMyInfo,
}: {
  path: string;
  setPinIsCorrect: Function;
  setData: Function;
  setMyInfo: Function;
}) => {
  return (
    <>
      <Title
        sx={{
          [tabletWidth]: { fontSize: "30px", marginTop: "3%" },
          [phoneWidth]: { fontSize: "24px", marginTop: "5%" },
        }}
      >
        Please enter your secret pin
      </Title>

      <PinInput
        length={4}
        initialValue=""
        // secret
        type="numeric"
        inputMode="number"
        style={{ marginTop: 20 }}
        inputStyle={{ borderColor: "black" }}
        inputFocusStyle={{ borderColor: "blue" }}
        autoSelect={true}
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
        onComplete={async (e) => {
          const get = await fetch(`/api/validatePin?pathName=${path}&pin=${e}`);

          const data = await get.json();

          if (data.error) {
            return showNotification({
              color: "red",
              disallowClose: true,
              message: data.error,
            });
          } else {
            setData(data);
            setMyInfo(data.body);
            setPinIsCorrect(true);
          }
        }}
      />
    </>
  );
};

export default EnterPin;
