import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../db";

import webpush from "web-push";

webpush.setVapidDetails(
  "https://serviceworke.rs/",
  process.env.VAPID_PUBLIC_KEY!!,
  process.env.VAPID_PRIVATE_KEY!!
);

// TODO send actual messages
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).end();

  const subscriptions = await prismaClient.subscription.findMany();

  subscriptions.forEach((subscription) => {
    const subscriptionBody = JSON.parse(subscription.subscriptionJson);

    webpush.sendNotification(
      subscriptionBody,
      JSON.stringify({
        title: "Time for a Vibe Check!",
        message: "How are you feeling?",
        url: "/vibe_check",
      })
    );
  });
};

export default handler;
