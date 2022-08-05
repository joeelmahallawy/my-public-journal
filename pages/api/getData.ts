import { NextApiRequest, NextApiResponse } from "next";
import { decrypt } from "../../helpers";
import prisma from "../../prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query: { pathName: path },
    } = req;

    // @ts-expect-error
    const page = await prisma.page.findUnique({ where: { path } });
    if (!page) throw new Error(`Path doesn't exist`);

    await prisma.$disconnect();

    res.status(200).json({ exists: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default handler;
