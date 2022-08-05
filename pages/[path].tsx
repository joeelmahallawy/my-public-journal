import PinInput from "react-pin-input";
import {
  Button,
  Center,
  Loader,
  Title,
  Text,
  Box,
  Textarea,
} from "@mantine/core";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  Redirect,
} from "next";
import React, { useEffect, useState } from "react";
import { useAsyncFn } from "react-use";
import { getEnvironmentURL, phoneWidth, tabletWidth } from "../helpers";
import { showNotification } from "@mantine/notifications";
import EnterPin from "../components/enterPin";
import ChangePin from "../components/changePin";
import { useRouter } from "next/router";
import Head from "next/head";

const Page = () => {
  const [pinIsCorrect, setPinIsCorrect] = useState(false);
  // supposed to be data.body
  const [myInfo, setMyInfo] = useState(undefined);
  const [infoHasBeenEdited, setInfoHasBeenEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChangingPin, setIsChangingPin] = useState(false);

  const [data, setData] = useState(undefined);

  const router = useRouter();

  if (isChangingPin) return <ChangePin data={data} />;

  return (
    <>
      <Head>
        <title>{router.query.path}</title>
      </Head>
      <Center sx={{ flexDirection: "column", padding: "0.5%" }}>
        {pinIsCorrect ? (
          <>
            <Center
              mt={10}
              sx={{
                gap: 0,
                flexDirection: "column",
                width: "40%",
                [tabletWidth]: { width: "80%" },
                [phoneWidth]: { width: "80%" },
              }}
            >
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsLoading(true);
                  const update = await fetch(`/api/updateData`, {
                    method: "PUT",
                    body: JSON.stringify({
                      data: myInfo,
                      path: data.path,
                      pin: data.pin,
                    }),
                  });
                  const response = await update.json();
                  if (!response.error) {
                    setIsLoading(false);
                    return showNotification({
                      color: "green",
                      disallowClose: true,
                      message: "Successfully updated!",
                    });
                  } else {
                    setIsLoading(false);
                    return showNotification({
                      color: "red",
                      disallowClose: true,
                      message: response.error,
                    });
                  }
                }}
                style={{ width: "100%" }}
              >
                <Textarea
                  mt={10}
                  required
                  defaultValue={data.body}
                  onChange={(e) => {
                    if (e.currentTarget.value !== data.body) {
                      setInfoHasBeenEdited(true);
                      setMyInfo(e.currentTarget.value);
                    } else setInfoHasBeenEdited(false);
                  }}
                  autosize
                  placeholder=""
                  sx={{ width: "100%" }}
                  label="Your notes"
                />

                <Center
                  mt={10}
                  sx={{ justifyContent: "space-between", gap: 10 }}
                >
                  <Button
                    variant="filled"
                    onClick={() => setIsChangingPin(true)}
                    color="violet"
                  >
                    Change my pin
                  </Button>

                  {infoHasBeenEdited && (
                    <Button loading={isLoading} type="submit">
                      Save
                    </Button>
                  )}
                </Center>
              </form>
            </Center>
          </>
        ) : (
          <EnterPin
            setMyInfo={setMyInfo}
            setPinIsCorrect={setPinIsCorrect}
            path={router?.query?.path as string}
            setData={setData}
          />
        )}
      </Center>
    </>
  );
};

export default Page;
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const {
    query: { path },
  } = ctx;

  const get = await fetch(
    `${getEnvironmentURL()}/api/getData?pathName=${path}`
  );
  const data = await get.json();

  if (!data.exists)
    return {
      notFound: true,
    };
  return { props: {} };
};
