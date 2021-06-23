import { useState } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import useSWR, { trigger } from "swr";

import "semantic-ui-css/semantic.min.css";
import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import UserContextProvider from "../src/common/contexts/UserContext";

import Header from "../src/header/Header";

const fetcher = async (input: RequestInfo, init: RequestInit) => {
  const res = await fetch(input, init);
  return res.json();
};

const App = ({ Component, pageProps }: AppProps) => {
  const [order, setOrder] = useState<"createdAt" | "likesCount">("createdAt");

  const { data: games } = useSWR(`/api/games?order=${order}`, fetcher);

  const triggerGames = () => trigger(`/api/games?order=${order}`);

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
          <Component
            {...pageProps}
            order={order}
            setOrder={setOrder}
            games={games}
            triggerGames={triggerGames}
          />
        </main>
      </UserContextProvider>
    </>
  );
};

export default App;
