const defaultReminderSettings = {
  enabled: false,
  timesEnabled: [],
};

const useSyncReminderSettings = () => {
  const syncReminderSettings = () => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator))
      return;

    (async () => {
      // Grab service worker
      const sw = (await navigator.serviceWorker.ready).active;

      sw?.postMessage({
        type: "syncReminderSettings",
        data:
          localStorage.getItem("reminderSettings") || defaultReminderSettings,
      });
    })();
  };

  return { syncReminderSettings };
};

export default useSyncReminderSettings;
