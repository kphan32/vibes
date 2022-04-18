import type { AppProps } from "next/app";

import "../styles/globals.css";
import "../styles/form.css";
import TransitionPage from "../components/TransitionPage";
import NavDrawerPage from "../components/NavDrawerPage";

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
