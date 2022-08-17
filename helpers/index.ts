import * as openpgp from "openpgp";
import crypto from "crypto";

export const getEnvironmentURL = (): string =>
  process.env.NODE_ENV === "production"
    ? "https://www.mysecurenote.com"
    : "http://localhost:3000";

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

export const sizes = {
  xs: 500,
  sm: 800,
  md: 1000,
  lg: 1200,
  xl: 1400,
  xxl: 1600,
};

// phones
export const phoneWidth = `@media only screen and (max-width: ${sizes.xs}px)`;

// tablets
export const tabletWidth = `@media only screen and (min-width: ${sizes.xs}px) and (max-width: ${sizes.md}px)`;

// ipad
export const ipadWidth = `@media only screen and (min-width: ${sizes.md}px) and (max-width: ${sizes.lg}px)`;

// laptop
export const laptopWidth = `@media only screen and (min-width: ${sizes.lg}px) and (max-width: ${sizes.xxl}px)`;

// monitors
export const monitorWidth = `@media (min-width: ${sizes.xxl}px)`;

// const createPhoneStyles=(property:string,value:string)=>{
//   return `${[]}`
// }
