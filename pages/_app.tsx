import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import BaseLayout from "../components/Layout/BaseLayout";
import { CharContextProvider } from "../context/charactersContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CharContextProvider>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </CharContextProvider>
  );
}

export default MyApp;
