import type { AppProps } from "next/app";

import "../styles/globals.css";
import "../styles/form.css";
import Transition from "../components/Transition";
import NavDrawerPage from "../components/NavDrawerPage";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NavDrawerPage>
      <Transition>
        <Component {...pageProps} />
      </Transition>
    </NavDrawerPage>
  );
}

export default MyApp;
