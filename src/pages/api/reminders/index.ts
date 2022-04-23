import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../../db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const endpoint = req.query["endpoint"];

    if (typeof endpoint !== "string") return res.status(500).end();

    try {
      const subscription = await prismaClient.subscription.findUnique({
        where: {
          endpoint,
        },
        include: {
          reminderTimes: true,
        },
      });

      if (subscription === null) throw "Subscription is null";

      const response: GetRemindersResponse = {
        remindersEnabled: subscription.remindersEnabled,
        hoursEnabled: subscription.reminderTimes
          .map((reminderTime) => reminderTime.hour)
          .sort(),
      };

      return res.status(200).json(response);
    } catch (e) {
      console.error(`Error getting reminder times for endpoint "${endpoint}"`);

      console.error(e);

      return res.status(500).end();
    }
  }

  if (req.method === "PUT") {
    const body: PutRemindersRequestBody = JSON.parse(req.body);

    try {
      await prismaClient.subscription.update({
        where: {
          endpoint: body.endpoint,
        },
        data: {
          remindersEnabled: body.enabled,
        },
      });

      return res.status(200).end();
    } catch (e) {
      console.error(
        `Error updating reminders enabled field for endpoint "${body.endpoint}`
      );

      console.error(e);

      return res.status(500).end();
    }
  }

  return res.status(405).end();
};

export interface GetRemindersResponse {
  remindersEnabled: boolean;
  hoursEnabled: number[];
}

export interface PutRemindersRequestBody {
  endpoint: string;
  enabled: boolean;
}

export default handler;
