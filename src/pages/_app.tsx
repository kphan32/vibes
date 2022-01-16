import type { AppProps } from "next/app";

import "../styles/globals.css";
import "../styles/form.css";
import Transition from "../components/Transition";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Transition>
      <Component {...pageProps} />
    </Transition>
  );
}

export default MyApp;
