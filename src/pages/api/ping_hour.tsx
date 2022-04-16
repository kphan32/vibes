import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../db";

import webpush from "web-push";
import { Subscription } from "@prisma/client";

webpush.setVapidDetails(
  "https://serviceworke.rs/",
  process.env.VAPID_PUBLIC_KEY!!,
  process.env.VAPID_PRIVATE_KEY!!
);

// TODO send actual messages
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).end();

  let subscriptions: Subscription[] = [];

  try {
    subscriptions = await prismaClient.subscription.findMany();
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error querying for subscriptions");
      console.error(e.message);
    }
  }

  subscriptions.forEach((subscription) => {
    const subscriptionBody = JSON.parse(subscription.subscriptionJson);

    webpush
      .sendNotification(
        subscriptionBody,
        JSON.stringify({
          title: "Time for a Vibe Check!",
          message: "How are you feeling?",
          url: "/vibe_check",
        })
      )
      .catch((e) => {
        if (e instanceof Error) {
          console.error(`Error sending push notification: ${e.message}`);
        }
      });
  });
};

export default handler;
