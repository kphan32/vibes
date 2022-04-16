import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../db";

import webpush from "web-push";
import { Subscription } from "@prisma/client";

webpush.setVapidDetails(
  "https://serviceworke.rs/",
  process.env.VAPID_PUBLIC_KEY!!,
  process.env.VAPID_PRIVATE_KEY!!
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let subscriptions: Subscription[] = [];

  try {
    subscriptions = await prismaClient.subscription.findMany();
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error querying for subscriptions");
      console.error(e.message);
    }
  }

  await Promise.all(
    subscriptions.map((subscription) => {
      const subscriptionBody = JSON.parse(subscription.subscriptionJson);

      return webpush
        .sendNotification(
          subscriptionBody,
          JSON.stringify({
            type: "reminder",
            title: "Time for a Vibe Check!",
            message: "How are you feeling?",
            url: "/vibe_check",
          })
        )
        .then((resp) => {
          console.info(
            `Pushed to subscription ${subscription.id}: ${resp.statusCode}`
          );
        })
        .catch((e) => {
          if (e instanceof Error) {
            console.error(`Error sending push notification: ${e.message}`);
          }
        });
    })
  );

  res.status(200).end();
};

export default handler;
