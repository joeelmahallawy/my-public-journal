import React, { useRef, useState } from "react";
import { Text, Group, Button, createStyles, Progress } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter } from "next/router";
import { storage } from "../firebase";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    marginBottom: 30,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  control: {
    position: "absolute",
    width: 250,
    left: "calc(50% - 125px)",
    // left: "calc(25% - 125px)",
    bottom: -20,
  },
}));

const DropzoneInput = ({
  imageUrls,
  setImageUrls,
  setInfoHasBeenEdited,
}: {
  imageUrls: string[];
  setImageUrls: Function;
  setInfoHasBeenEdited: Function;
}) => {
  const [percent, setPercent] = useState(undefined);
  const { classes, theme } = useStyles();
  const openRef = useRef<() => void>(null);
  const router = useRouter();
  return (
    <>
      <div className={classes.wrapper}>
        <Dropzone
          mt={10}
          sx={{ width: "100%" }}
          openRef={openRef}
          onDrop={(e) => {
            const storageRef = ref(
              storage,
              `gs://${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/photo_ids/${router.query.path}|${e[0].name}`
            );
            const uploadTask = uploadBytesResumable(storageRef, e[0]);
            uploadTask.on(
              "state_changed",
              (snap) => {
                const percent = Math.round(
                  (snap.bytesTransferred / snap.totalBytes) * 100
                );
                // update progress
                setPercent(percent);
              },
              (err) => {
                console.log(err.message);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                  setImageUrls([...imageUrls, url]);
                });
              }
            );

            setInfoHasBeenEdited(true);
          }}
          className={classes.dropzone}
          radius="md"
          accept={[MIME_TYPES.png, MIME_TYPES.svg, MIME_TYPES.jpeg]}
          maxSize={30 * 1024 ** 2}
        >
          <div style={{ pointerEvents: "none" }}>
            <Group position="center">
              <Dropzone.Accept>
                <IconDownload
                  size={50}
                  color={theme.colors[theme.primaryColor][6]}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconCloudUpload
                  size={50}
                  color={
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[0]
                      : theme.black
                  }
                  stroke={1.5}
                />
              </Dropzone.Idle>
            </Group>

            <Text align="center" weight={700} size="lg" mt="xl">
              <Dropzone.Accept>Drop files here</Dropzone.Accept>
              <Dropzone.Reject>Image less than 30mb</Dropzone.Reject>
              <Dropzone.Idle>
                Upload photo ID or a driver's license
              </Dropzone.Idle>
            </Text>
            <Text align="center" size="sm" mt="xs" color="dimmed">
              Choose files to upload to your secret vault
              {/* Drag&apos;n&apos;drop files here to upload. We can accept only{" "}
            <i>.pdf</i> files that are less than 30mb in size. */}
            </Text>
          </div>
        </Dropzone>

        <Button
          className={classes.control}
          size="md"
          radius="xl"
          onClick={() => openRef.current?.()}
        >
          Select images
        </Button>
      </div>
      <Progress mb={10} value={percent} />
    </>
  );
};
export default DropzoneInput;
