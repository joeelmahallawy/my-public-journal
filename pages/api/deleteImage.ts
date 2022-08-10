import { NextApiRequest, NextApiResponse } from "next";
import { decrypt, encrypt } from "../../helpers";
import prisma from "../../prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //   image is a single url
    const { path, pin, image } = JSON.parse(req.body);

    const page = await prisma.page.findUnique({ where: { path } });

    const decryptedPin = await decrypt(page.pin);

    const newImageUrls = page.imageUrl.filter((url) => url != image);

    if (pin !== decryptedPin) throw new Error("Not authorized: Invalid pin");

    await prisma.page.updateMany({
      where: { path },
      data: { imageUrl: { set: newImageUrls } },
    });

    await prisma.$disconnect();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default handler;
