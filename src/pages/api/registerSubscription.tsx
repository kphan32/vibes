import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await prismaClient.subscription.upsert({
      where: {
        subscriptionJson: req.body,
      },
      update: {
        updatedAt: new Date(),
      },
      create: {
        subscriptionJson: req.body,
      },
    });

    return res.status(200).end();
  } catch (e) {
    // Ignore unique-ness errors (row already exists)
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(200).end();
    }

    console.error(e);

    return res.status(500).end();
  }
};

export default handler;
