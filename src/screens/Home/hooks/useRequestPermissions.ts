import { useEffect, useState } from "react";
import base64ToUint8Array from "../../../utils/base64_to_uint8_array";

const vapidPublicKey = base64ToUint8Array(
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!!
);

const useRequestPermissions = (): UseRequestPermissionsReturn => {
  const [notificationPermStatus, setNotificationPermStatus] = useState<
    NotificationPermission | "loading"
  >("loading");

  // Request permission to display notifications
  useEffect(() => {
    (async () => {
      if (notificationPermStatus === "loading") {
        setNotificationPermStatus(await Notification.requestPermission());
      }
    })();
  }, [notificationPermStatus, setNotificationPermStatus]);

  // When permission granted, register subscription
  useEffect(() => {
    if (notificationPermStatus !== "granted") return;
    if (typeof window === "undefined" || !("serviceWorker" in navigator))
      return;

    (async () => {
      // Grab service worker
      const sw = await navigator.serviceWorker.ready;

      // Create or find push subscription
      const subscription = await sw.pushManager.subscribe({
        userVisibleOnly: false,
        applicationServerKey: vapidPublicKey,
      });
      if (!subscription) console.error("No subscription found");

      // Register subscription
      const resp = await fetch("/api/registerSubscription", {
        method: "POST",
        headers: {
          "Content-Type": "applcation/json",
        },
        body: JSON.stringify(subscription),
      });

      // Log any errors
      if (!resp.ok) {
        const json = await resp.json();
        console.error(json);
      }
    })();
  }, [notificationPermStatus]);

  return {
    notificationPermissionStatus: notificationPermStatus,
  };
};

interface UseRequestPermissionsReturn {
  notificationPermissionStatus: NotificationPermission | "loading";
}

export default useRequestPermissions;
