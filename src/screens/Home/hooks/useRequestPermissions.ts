import { useEffect, useState } from "react";

const useRequestPermissions = (): UseRequestPermissionsReturn => {
  const [notificationPermStatus, setNotificationPermStatus] = useState<
    NotificationPermission | "loading"
  >("loading");

  useEffect(() => {
    (async () => {
      if (notificationPermStatus === "loading") {
        setNotificationPermStatus(await Notification.requestPermission());
      }
    })();
  }, [notificationPermStatus, setNotificationPermStatus]);

  return {
    notificationPermissionStatus: notificationPermStatus,
  };
};

interface UseRequestPermissionsReturn {
  notificationPermissionStatus: NotificationPermission | "loading";
}

export default useRequestPermissions;
