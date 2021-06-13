import { Header } from "semantic-ui-react";
import Games from "../src/games/components/Games";

import styles from "../styles/home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header
        size="huge"
        style={{ textAlign: "center" }}
        className={styles.header}
      >
        차근차근 게임 공유
      </Header>
      <Games />
    </div>
  );
}
