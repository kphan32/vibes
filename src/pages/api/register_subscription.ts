import prismaClient from "@/db";
import { NextApiRequest, NextApiResponse } from "next";

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
