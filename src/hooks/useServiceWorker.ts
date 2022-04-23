import base64ToUint8Array from "@/utils/base64_to_uint8_array";
import { useEffect, useState } from "react";

const vapidPublicKey = base64ToUint8Array(
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!!
);

const useServiceWorker = (): UseRequestPermissionsReturn => {
  const [serviceWorkerRegistration, setServiceWorkerRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  const [notificationPermStatus, setNotificationPermStatus] = useState<
    NotificationPermission | "loading"
  >("loading");

  const [subscriptionEndpoint, setSubscriptionEndpoint] = useState<
    string | null
  >(null);

  // Grab service worker registration
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator))
      return;

    (async () => {
      setServiceWorkerRegistration(await navigator.serviceWorker.ready);
    })();
  }, [setServiceWorkerRegistration]);

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
    // Don't attempt to register subscription if permission was not granted
    if (notificationPermStatus !== "granted") return;

    // Wait for service worker to be grabbed
    if (serviceWorkerRegistration === null) return;

    (async () => {
      // Create or find push subscription
      const subscription =
        await serviceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: vapidPublicKey,
        });
      if (!subscription) console.error("No subscription found");

      setSubscriptionEndpoint(subscription.endpoint);

      // Register subscription
      const resp = await fetch("/api/register_subscription", {
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
  }, [
    serviceWorkerRegistration,
    notificationPermStatus,
    setSubscriptionEndpoint,
  ]);

  return {
    serviceWorkerRegistration,
    notificationPermissionStatus: notificationPermStatus,
    subscriptionEndpoint,
  };
};

interface UseRequestPermissionsReturn {
  serviceWorkerRegistration: ServiceWorkerRegistration | null;
  notificationPermissionStatus: NotificationPermission | "loading";
  subscriptionEndpoint: string | null;
}

export default useServiceWorker;
