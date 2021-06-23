import { Header } from "semantic-ui-react";

import styles from "../styles/home.module.css";

import Games from "../src/games/Games";

export default function Home({ order, setOrder }) {
  return (
    <div className={styles.container}>
      <Header size="huge" className={styles.header}>
        차차코 게임 목록
      </Header>
      <Games order={order} setOrder={setOrder} />
    </div>
  );
}
