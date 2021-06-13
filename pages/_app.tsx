import { AppProps } from "next/app";
import { Container } from "semantic-ui-react";

import Header from "../src/header/components/Header";

import "semantic-ui-css/semantic.min.css";
import "../styles/globals.css";

import UserContextProvider from "../src/common/contexts/UserContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
