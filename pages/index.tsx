import { Dispatch, SetStateAction } from "react";
import { Header } from "semantic-ui-react";

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
      <Header size="huge" className={styles.header}>
        차차코 게임 목록
      </Header>
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
