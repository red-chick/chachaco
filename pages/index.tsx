import { Dispatch, SetStateAction } from "react";
import { Header } from "semantic-ui-react";
import Head from "next/head";

import styles from "../styles/home.module.css";

import Games from "../src/games/Games";

type Props = {
  order: "createdAt" | "likesCount";
  setOrder: Dispatch<SetStateAction<"createdAt" | "likesCount">>;
  games: any;
  trigger: () => Promise<any>;
};

const Home = ({ order, setOrder, games, trigger }: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>차근차근 게임 코딩 공유 커뮤니티</title>
        <meta property="og:title" content="차근차근 게임 코딩 공유 커뮤니티" />
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
      <Games
        order={order}
        setOrder={setOrder}
        games={games}
        trigger={trigger}
      />
    </div>
  );
};

export default Home;
