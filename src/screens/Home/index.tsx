import type { NextPage } from "next";
import { useEffect } from "react";
import EntryForm from "../../components/EntryForm";

const Home: NextPage = () => {
  const sendNotification = () => {
    if (Notification.permission === "granted") {
      navigator.serviceWorker.getRegistration().then((reg) => {
        reg?.showNotification("Hello world!");
      });
    }
  };

  // Request notification permission immediately
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center space-y-8 px-4 text-center">
      <p className="text-4xl font-bold drop-shadow-lg">
        Next.js + TypeScript + TailwindCSS PWA
      </p>
      <button
        className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white px-4 py-2 rounded-md text-2xl drop-shadow-md hover:drop-shadow-lg transition-all"
        onClick={sendNotification}
      >
        Click Me!
      </button>
      <EntryForm />
    </div>
  );
};

export default Home;
