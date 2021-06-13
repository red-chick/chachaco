import { AppProps } from "next/app";
import Head from "next/head";

import Header from "../src/header/components/Header";

import "semantic-ui-css/semantic.min.css";
import "../styles/globals.css";

import UserContextProvider from "../src/common/contexts/UserContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, user-scalable=no"
        />
      </Head>
      <UserContextProvider>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
      </UserContextProvider>
    </>
  );
}

export default App;
