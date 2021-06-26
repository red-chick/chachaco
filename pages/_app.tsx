import { useState } from "react";
import { AppProps } from "next/app";
import Head from "next/head";

import "semantic-ui-css/semantic.min.css";
import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import UserContextProvider from "../src/common/contexts/UserContext";

import Header from "../src/header/Header";
import useMySWR from "../src/common/hooks/useMySWR";

const App = ({ Component, pageProps }: AppProps) => {
  // 게임목록과 정렬기준 페이지 이동중에 초기화 되지 않도록 최상단 컴포넌트에 정의
  const [order, setOrder] = useState<"createdAt" | "likesCount">("createdAt");

  const { data: games, trigger } = useMySWR(`/api/games?order=${order}`);

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
          <Component
            {...pageProps}
            order={order}
            setOrder={setOrder}
            games={games}
            trigger={trigger}
          />
        </main>
      </UserContextProvider>
    </>
  );
};

export default App;
