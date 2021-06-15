import { AppProps } from "next/app";
import Head from "next/head";

import Header from "../src/header/components/Header";

import "semantic-ui-css/semantic.min.css";
import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import UserContextProvider from "../src/common/contexts/UserContext";
import { useState } from "react";

function App({ Component, pageProps }: AppProps) {
  const [order, setOrder] = useState<"createdAt" | "likesCount">("createdAt");

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, user-scalable=no"
        />
        <title>차차코 게임 공유</title>
        <meta property="og:title" content="차차코 게임 공유" />
        <meta
          name="description"
          content="차근차근 게임 코딩으로 제작한 게임들을 공유하는 커뮤니티 입니다."
        />
        <meta
          property="og:description"
          content="차근차근 게임 코딩으로 제작한 게임들을 공유하는 커뮤니티 입니다."
        />
        <meta
          property="og:image"
          content="https://www.chachaco.site/thumbnail.jpg"
        />
      </Head>
      <UserContextProvider>
        <Header />
        <main>
          <Component {...pageProps} order={order} setOrder={setOrder} />
        </main>
      </UserContextProvider>
    </>
  );
}

export default App;
