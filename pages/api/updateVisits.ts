import { NextApiRequest, NextApiResponse } from "next";
import { decrypt, encrypt } from "../../helpers";
import prisma from "../../prisma";

const updateVisits = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { path, pin } = JSON.parse(req.body);

    const page = await prisma.page.findUnique({ where: { path } });

    const decryptedPin = await decrypt(page.pin);

    if (pin !== decryptedPin) throw new Error("Not authorized: Invalid pin");

    await prisma.page.update({
      where: { id: page.id },
      data: { totalVisits: page.totalVisits + 1 },
    });

    await prisma.$disconnect();

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export default updateVisits;
