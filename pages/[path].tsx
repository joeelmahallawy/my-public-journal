import {
  Button,
  Image,
  Center,
  Text,
  Box,
  Textarea,
  Modal,
} from "@mantine/core";
import { GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";
import { getEnvironmentURL, phoneWidth, tabletWidth } from "../helpers";
import { showNotification } from "@mantine/notifications";
import EnterPin from "../components/enterPin";
import ChangePin from "../components/changePin";
import { useRouter } from "next/router";
import Head from "next/head";
import { Page } from ".prisma/client";
import ImageInput from "../components/input";

const Page = () => {
  const [opened, setOpened] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [urlToDelete, setUrlToDelete] = useState("");

  const [pinIsCorrect, setPinIsCorrect] = useState(false);
  // supposed to be data.body
  const [myInfo, setMyInfo] = useState(undefined);
  const [infoHasBeenEdited, setInfoHasBeenEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChangingPin, setIsChangingPin] = useState(false);

  const [data, setData] = useState<Page>(undefined);

  const router = useRouter();

  if (isChangingPin) return <ChangePin data={data} />;

  return (
    <>
      <Head>
        <title>{router.query.path}</title>
      </Head>
      <Center
        sx={{ flexDirection: "column", padding: "0.5%", paddingBottom: "5%" }}
      >
        {pinIsCorrect ? (
          <>
            <Center
              mt={10}
              sx={{
                gap: 0,
                flexDirection: "column",
                width: "40%",
                [tabletWidth]: { width: "80%" },
                [phoneWidth]: { width: "90%" },
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
                      image: imageUrls || [],
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
                <Text>
                  <span style={{ fontWeight: 800 }}>Total page visits:</span>{" "}
                  {data.totalVisits}
                </Text>
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
                <Modal
                  size="sm"
                  opened={opened}
                  onClose={() => setOpened(false)}
                  withCloseButton={false}
                >
                  <Text weight={600}>Delete image?</Text>
                  <Center mt={5} sx={{ justifyContent: "flex-end", gap: 10 }}>
                    <Button variant="default" onClick={() => setOpened(false)}>
                      Cancel
                    </Button>
                    <Button
                      color="red"
                      onClick={async () => {
                        // NOTE: check over this
                        const deleteImage = await fetch(`/api/deleteImage`, {
                          method: "DELETE",
                          body: JSON.stringify({
                            path: data.path,
                            pin: data.pin,
                            image: urlToDelete,
                          }),
                        });
                        const deletedSuccessfully = await deleteImage.json();

                        if (!deletedSuccessfully.error) {
                          setImageUrls([
                            ...imageUrls.filter((url) => url != urlToDelete),
                          ]);

                          setOpened(false);
                          return showNotification({
                            color: "green",
                            disallowClose: true,
                            message: "Image deleted!",
                          });
                        } else {
                          setOpened(false);
                          return showNotification({
                            color: "red",
                            disallowClose: true,
                            message: deletedSuccessfully.error,
                          });
                        }
                      }}
                    >
                      Yes
                    </Button>
                  </Center>
                </Modal>
                <Box mt={20}>
                  {/* {loadedImageUrls.map((url, i) => (
                    <Image
                      m={3}
                      key={`${url}:${i}`}
                      sx={{
                        "&:hover": { cursor: "pointer", opacity: 0.8 },
                        display: "inline-flex",
                      }}
                      onClick={() => {
                        setOpened(true);
                        setUrlToDelete(url);
                      }}
                      src={url}
                      width={"100%"}
                      // width={"200px"}
                    />
                  ))} */}
                </Box>

                <Box mt={20}>
                  {imageUrls.map((url, i) => (
                    <Image
                      onClick={() => {
                        setOpened(true);
                        setUrlToDelete(url);
                      }}
                      m={3}
                      key={i}
                      sx={{
                        "&:hover": { cursor: "pointer", opacity: 0.8 },
                        display: "inline-grid",
                      }}
                      src={url}
                      width={"100%"}
                    />
                  ))}
                </Box>
                <ImageInput
                  setInfoHasBeenEdited={setInfoHasBeenEdited}
                  setImageUrls={setImageUrls}
                  imageUrls={imageUrls}
                />
                {/* <DropzoneInput
                  setInfoHasBeenEdited={setInfoHasBeenEdited}
                  setImageUrls={setImageUrls}
                  imageUrls={imageUrls}
                /> */}
                <Center
                  mt={15}
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
            {console.log("some data:", data)}
          </>
        ) : (
          <EnterPin
            setMyInfo={setMyInfo}
            setPinIsCorrect={setPinIsCorrect}
            path={router?.query?.path as string}
            setData={setData}
            setImageUrls={setImageUrls}
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
