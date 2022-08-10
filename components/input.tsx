import { useState } from "react";
import { Text, Image, SimpleGrid } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

export default function Demo() {
  const [files, setFiles] = useState<File[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

  return (
    <div>
      <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
        <Text align="center">Upload images here</Text>
        <Text align="center" size="sm" color="dimmed">
          Save driver's license or photo ID
        </Text>
      </Dropzone>

      {/* <SimpleGrid
        cols={4}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        mt={previews.length > 0 ? "xl" : 0}
      >
        {previews}
      </SimpleGrid> */}
    </div>
  );
}
