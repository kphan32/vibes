import {
  GetRemindersResponse,
  PutRemindersRequestBody,
} from "@/pages/api/reminders";
import { PutAddHourRequestBody } from "@/pages/api/reminders/add_hour";
import { PutRemoveHourRequestBody } from "@/pages/api/reminders/remove_hour";
import { useEffect, useMemo, useState } from "react";
import useServiceWorker from "./useServiceWorker";

const useReminderSettings = () => {
  const { subscriptionEndpoint, notificationPermissionStatus } =
    useServiceWorker();

  const [loading, setLoading] = useState(true);

  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [utcHoursEnabled, setUTCHoursEnabled] = useState<number[]>([]);

  const hoursEnabled: Hour[] = useMemo(
    () =>
      utcHoursEnabled.map((utcHour) => {
        const date = new Date();
        date.setUTCHours(utcHour);

        let hours = date.getHours() % 12;
        if (hours === 0) hours = 12;

        const localizedHour = `${hours}${date.getHours() < 12 ? "AM" : "PM"}`;

        return {
          utcHour,
          localizedHour,
        };
      }),
    [utcHoursEnabled]
  );

  // Initial data fetch
  useEffect(() => {
    if (subscriptionEndpoint === null) return;
    if (!loading) return;

    (async () => {
      const response = await fetch(
        `/api/reminders?endpoint=${subscriptionEndpoint}`
      );

      // TODO retry
      if (!response.ok) return;

      const data: GetRemindersResponse = await response.json();
      setEnabled(data.remindersEnabled);
      setUTCHoursEnabled(data.hoursEnabled);
      setLoading(false);
    })();
  }, [
    subscriptionEndpoint,
    setLoading,
    setEnabled,
    setUTCHoursEnabled,
    loading,
  ]);

  const updateEnabled = (newEnabled: boolean) => {
    if (newEnabled === enabled) return;
    if (subscriptionEndpoint === null) return;

    (async () => {
      setEnabled(newEnabled);

      const requestBody: PutRemindersRequestBody = {
        endpoint: subscriptionEndpoint,
        enabled: newEnabled,
      };

      const response = await fetch("/api/reminders", {
        method: "PUT",
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.error("Failed to update reminders enabled");
        console.error(response.status, response.statusText);

        setEnabled(enabled);
      }
    })();
  };

  const addHour = (hour: number) => {
    if (utcHoursEnabled.includes(hour)) return;
    if (subscriptionEndpoint === null) return;

    (async () => {
      setUTCHoursEnabled([...utcHoursEnabled, hour]);

      const requestBody: PutAddHourRequestBody = {
        endpoint: subscriptionEndpoint,
        hour,
      };

      const response = await fetch("/api/reminders/add_hour", {
        method: "PUT",
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.error("Failed to add hour");
        console.error(response.status, response.statusText);

        setUTCHoursEnabled([...utcHoursEnabled]);
      }
    })();
  };

  const removeHour = (hour: number) => {
    if (!utcHoursEnabled.includes(hour)) return;
    if (subscriptionEndpoint === null) return;

    (async () => {
      const oldHoursEnabled = [...utcHoursEnabled];
      const newHoursEnabled = [...utcHoursEnabled];

      newHoursEnabled.splice(utcHoursEnabled.indexOf(hour), 1);

      setUTCHoursEnabled(newHoursEnabled);

      const requestBody: PutRemoveHourRequestBody = {
        endpoint: subscriptionEndpoint,
        hour,
      };

      const response = await fetch("/api/reminders/remove_hour", {
        method: "PUT",
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.error("Failed to remove hour");
        console.error(response.status, response.statusText);

        setUTCHoursEnabled(oldHoursEnabled);
      }
    })();
  };

  return {
    loading,
    notificationPermissionStatus,
    enabled: !!enabled,
    setEnabled: updateEnabled,
    hoursEnabled,
    addHour,
    removeHour,
  };
};

export interface Hour {
  utcHour: number;
  localizedHour: string;
}

export default useReminderSettings;
