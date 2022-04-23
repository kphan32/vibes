import type { AppProps } from "next/app";

import NavDrawerPage from "@/components/NavDrawerPage";
import TransitionPage from "@/components/TransitionPage";

import "@/styles/globals.css";
import "@/styles/form.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NavDrawerPage>
      <TransitionPage>
        <Component {...pageProps} />
      </TransitionPage>
    </NavDrawerPage>
  );
}

export default MyApp;
