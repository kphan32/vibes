"use strict";

self.addEventListener("push", function (event) {
  const data = JSON.parse(event.data.text());

  const body = {
    body: data.message,
    icon: "/icons/android-chrome-192x192.png",
    data: {
      url: data.url,
    },
  };

  event.waitUntil(
    self.registration
      .showNotification(data.title, body)
      .then((resp) => resolve(resp))
      .catch((e) => resolve(e))
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  if (!!event.notification.data.url) {
    clients.openWindow(event.notification.data.url);
  }
});
