import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const subscriptionString = req.body;
    const subscription: Subscription = JSON.parse(req.body);

    await prismaClient.subscription.upsert({
      where: {
        endpoint: subscription.endpoint,
      },
      update: {
        updatedAt: new Date(),
      },
      create: {
        endpoint: subscription.endpoint,
        subscriptionString,
      },
    });

    return res.status(200).end();
  } catch (e) {
    console.error(e);

    return res.status(500).end();
  }
};

interface Subscription {
  endpoint: string;
}

export default handler;
