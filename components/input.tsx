import React, { useState } from "react";
import { Text, Image, SimpleGrid, Progress } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import { useRouter } from "next/router";

const ImageInput = ({
  imageUrls,
  setImageUrls,
  setInfoHasBeenEdited,
}: {
  imageUrls: string[];
  setImageUrls: Function;
  setInfoHasBeenEdited: Function;
}) => {
  const [percent, setPercent] = useState(undefined);
  //   const [files, setFiles] = useState<File[]>([]);

  //   const previews = files.map((file, index) => {
  //     const imageUrl = URL.createObjectURL(file);
  //     return (
  //       <Image
  //         key={index}
  //         src={imageUrl}
  //         imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
  //       />
  //     );
  //   });
  const router = useRouter();

  return (
    <>
      <div style={{ marginTop: 10 }}>
        <Dropzone
          accept={IMAGE_MIME_TYPE}
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
          maxSize={300 * 1024 ** 2}
        >
          <Text align="center">Save images here</Text>
          <Text align="center" size="sm" color="dimmed">
            Upload your driver's license or photo ID
          </Text>
        </Dropzone>

        {/* <SimpleGrid
        cols={4}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        mt={previews.length > 0 ? "xl" : 0}
      >
        {previews}
      </SimpleGrid> */}
        <Progress mt={10} mb={10} value={percent} />
      </div>
    </>
  );
};
export default ImageInput;
