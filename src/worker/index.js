"use strict";

let reminderSettings = {
  enabled: false,
  timesEnabled: [],
};

// Get closest current hour with period attached (ie '12AM' or)
const getRoundedCurrentHour = () => {
  const date = new Date();
  date.setHours(date.getHours() + Math.round(date.getMinutes() / 60));

  let hour = date.getHours();
  let period = "AM";

  if (hour >= 12) {
    period = "PM";
  }

  // Convert to 12-hour format
  hour = hour % 12;
  hour = hour ? hour : 12;

  return `${hour}${period}`;
};

const shouldSendReminderNow = () => {
  return (
    reminderSettings.enabled &&
    reminderSettings.timesEnabled.includes(getRoundedCurrentHour())
  );
};

self.addEventListener("message", function (event) {
  const message = event.data;

  if (message.type === "syncReminderSettings") {
    reminderSettings = JSON.parse(message.data);
  }
});

self.addEventListener("push", function (event) {
  const data = JSON.parse(event.data.text());

  if (data.type === "reminder") {
    // Short circuit if not enabled
    if (!shouldSendReminderNow()) return;

    console.info("Pushing reminder");

    const body = {
      body: data.message,
      icon: "/icons/android-chrome-192x192.png",
      data: {
        url: data.url,
      },
    };

    event.waitUntil(registration.showNotification(data.title, body));
  }
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  if (!!event.notification.data.url) {
    clients.openWindow(event.notification.data.url);
  }
});
