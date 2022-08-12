import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma";
import * as openpgp from "openpgp";

import crypto from "crypto";
import { decrypt, encrypt } from "../../helpers";

type DataInput = {
  path: string;
  // firstName: string;
  body: string;
  pin: string;
  images: string[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data: DataInput = JSON.parse(req.body);

    const doesThePathExist = await prisma.page.findFirst({
      where: { path: data.path },
    });

    if (doesThePathExist)
      throw new Error("This url already exists, please choose another one.");

    // since the encrypt function returns an object, we turn it into string so we can store it in DB
    const encryptedBody = await encrypt(data.body);
    const encryptedPin = await encrypt(data.pin);

    const createNewPage = await prisma.page.create({
      data: {
        path: data.path,
        pin: encryptedPin,
        body: encryptedBody,
        imageUrl: { set: data.images },
      },
    });

    await prisma.$disconnect();

    res.status(200).json({ data: createNewPage });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export default handler;
