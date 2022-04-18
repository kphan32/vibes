import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const body: GetRequestBody = JSON.parse(req.body);

    try {
      const subscription = await prismaClient.subscription.findUnique({
        where: {
          endpoint: body.endpoint,
        },
        include: {
          reminderTimes: true,
        },
      });

      if (subscription === null) throw "Subscription is null";

      const response = {
        remindersEnabled: subscription.remindersEnabled,
        reminderTimes: subscription.reminderTimes,
      };

      return res.status(200).json(response);
    } catch (e) {
      console.error(
        `Error getting reminder times for endpoint "${body.endpoint}"`
      );

      console.error(e);

      return res.status(500).end();
    }
  }

  if (req.method === "PUT") {
    const body: PutRequestBody = JSON.parse(req.body);

    if (body.enabled !== undefined) {
      try {
        await prismaClient.subscription.update({
          where: {
            endpoint: body.endpoint,
          },
          data: {
            remindersEnabled: body.enabled,
          },
        });
      } catch (e) {
        console.error(
          `Error updating reminders enabled field for endpoint "${body.endpoint}`
        );

        console.error(e);

        return res.status(500).end();
      }
    }

    if (body.hour !== undefined) {
      try {
        await prismaClient.reminderTime.upsert({
          where: {
            subscriptionEndpoint_hour: {
              subscriptionEndpoint: body.endpoint,
              hour: body.hour,
            },
          },
          update: {},
          create: {
            subscriptionEndpoint: body.endpoint,
            hour: body.hour,
          },
        });

        return res.status(200).end();
      } catch (e) {
        console.error(
          `Error adding reminder time at hour ${body.hour} for endpoint "${body.endpoint}`
        );

        console.error(e);

        return res.status(500).end();
      }
    }
  }

  res.status(405).end();
};

interface GetRequestBody {
  endpoint: string;
}

interface PutRequestBody {
  endpoint: string;
  enabled?: boolean;
  hour?: number;
}

export default handler;
