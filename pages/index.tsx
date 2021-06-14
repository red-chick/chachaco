import Head from "next/head";
import { Header } from "semantic-ui-react";
import Games from "../src/games/components/Games";

import styles from "../styles/home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>차차코 게임 공유</title>
      </Head>
      <Header size="huge" className={styles.header}>
        차차코 게임 목록
      </Header>
      <Games />
    </div>
  );
}
