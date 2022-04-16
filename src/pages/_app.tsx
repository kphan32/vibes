import type { AppProps } from "next/app";

import "../styles/globals.css";
import "../styles/form.css";
import TransitionPage from "../components/TransitionPage";
import NavDrawerPage from "../components/NavDrawerPage";
import useSyncReminderSettings from "../hooks/useSyncReminderSettings";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const { syncReminderSettings } = useSyncReminderSettings();

  useEffect(() => syncReminderSettings(), [syncReminderSettings]);

  return (
    <NavDrawerPage>
      <TransitionPage>
        <Component {...pageProps} />
      </TransitionPage>
    </NavDrawerPage>
  );
}

export default MyApp;
