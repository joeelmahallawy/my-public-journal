import * as openpgp from "openpgp";
import crypto from "crypto";

export const getEnvironmentURL = (): string =>
  process.env.NODE_ENV === "production"
    ? "http://localhost:3000"
    : "https://my-public-journal.vercel.app";

export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(
    "aes-256-ctr",
    process.env.NEXT_PUBLIC_ENCRYPTION_HASH,
    iv
  );
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return JSON.stringify({
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  });
};

export const decrypt = (input: string): string => {
  const hash = JSON.parse(input);
  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    process.env.NEXT_PUBLIC_ENCRYPTION_HASH,
    Buffer.from(hash.iv, "hex")
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);

  return decrpyted.toString();
};
