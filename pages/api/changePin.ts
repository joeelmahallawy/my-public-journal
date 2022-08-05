import { NextApiRequest, NextApiResponse } from "next";
import { decrypt, encrypt } from "../../helpers";
import prisma from "../../prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { path, pin, oldPin } = JSON.parse(req.body);

    const encryptedPin = await encrypt(pin);

    const page = await prisma.page.findUnique({ where: { path } });
    const decryptedPin = await decrypt(page.pin);

    if (oldPin !== decryptedPin) throw new Error("Not authorized: Invalid pin");

    await prisma.page.updateMany({
      where: { path },
      data: { pin: encryptedPin },
    });

    await prisma.$disconnect();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default handler;
