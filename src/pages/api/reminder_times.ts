import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const body: GetRequestBody = JSON.parse(req.body);

    try {
      const reminderTimers = await prismaClient.reminderTime.findMany({
        where: {
          subscriptionEndpoint: body.endpoint,
        },
      });

      return res.status(200).json(reminderTimers);
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

  res.status(405).end();
};

interface GetRequestBody {
  endpoint: string;
}

interface PutRequestBody {
  endpoint: string;
  hour: number;
}

export default handler;
