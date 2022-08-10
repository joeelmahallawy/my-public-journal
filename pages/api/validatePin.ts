import { NextApiRequest, NextApiResponse } from "next";
import { storage } from "../../firebase";
import { decrypt } from "../../helpers";
import prisma from "../../prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query: { pathName, pin },
    } = req;

    // @ts-expect-error
    const data = await prisma.page.findUnique({ where: { path: pathName } });

    const decryptedPin = await decrypt(data.pin);

    if (pin !== decryptedPin) throw new Error("Invalid pin");

    const body = await decrypt(data.body);
    await prisma.$disconnect();

    res.status(200).json({ ...data, body, pin: decryptedPin });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
export default handler;
