import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../../db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const body: PutRemoveHourRequestBody = JSON.parse(req.body);

    try {
      await prismaClient.reminderTime.delete({
        where: {
          subscriptionEndpoint_hour: {
            subscriptionEndpoint: body.endpoint,
            hour: body.hour,
          },
        },
      });

      return res.status(200).end();
    } catch (e) {
      console.error(
        `Error removing reminder time at hour ${body.hour} for endpoint "${body.endpoint}`
      );

      console.error(e);

      return res.status(500).end();
    }
  }

  return res.status(405).end();
};

export interface PutRemoveHourRequestBody {
  endpoint: string;
  hour: number;
}

export default handler;
