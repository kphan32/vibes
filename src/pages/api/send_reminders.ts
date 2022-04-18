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
    const utcHour = getClosestUTCHour();
    const reminderTimes = await prismaClient.reminderTime.findMany({
      where: {
        hour: utcHour,
      },
      include: {
        subscription: true,
      },
    });

    subscriptions = reminderTimes.map(
      (reminderTime) => reminderTime.subscription
    );
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error querying for subscriptions");
      console.error(e.message);
    }
  }

  await Promise.all(
    subscriptions.map((subscription) => {
      const subscriptionBody = JSON.parse(subscription.subscriptionString);

      return webpush
        .sendNotification(
          subscriptionBody,
          JSON.stringify({
            title: "Time for a Vibe Check!",
            message: "How are you feeling?",
            url: "/vibe_check",
          })
        )
        .then((resp) => {
          console.info(
            `Pushed to subscription #${subscription.id}, returned code ${resp.statusCode}`
          );
        })
        .catch((e) => {
          if (e instanceof Error) {
            console.error(
              `Error pushing to subscription #${subscription.id}: ${e.message}`
            );
          }
        });
    })
  );

  res.status(200).end();
};

// Get closest current hour in UTC time
const getClosestUTCHour = (): number => {
  const date = new Date();
  date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));

  return date.getUTCHours();
};

export default handler;
