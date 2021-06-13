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
        <title>차근차근 게임 공유 커뮤니티</title>
        <meta
          name="description"
          content="차근차근 게임 코딩으로 만든 게임을 공유하는 커뮤니티 입니다."
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
