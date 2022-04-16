import { PrismaClient } from "@prisma/client";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prismaClient =
  global.prisma ||
  new PrismaClient({
    log: ["query"],
  });

export default prismaClient;

if (process.env.NODE_ENV !== "production") global.prisma = prismaClient;
