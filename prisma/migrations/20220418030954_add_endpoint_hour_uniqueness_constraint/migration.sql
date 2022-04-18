/*
  Warnings:

  - A unique constraint covering the columns `[subscription_endpoint,hour]` on the table `reminder_times` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "endpoint_hour_unique_constraint" ON "reminder_times"("subscription_endpoint", "hour");
