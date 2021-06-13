import Head from "next/head";
import { useRouter } from "next/router";
import { Dimmer, Header, Image, Loader } from "semantic-ui-react";
import useSWR from "swr";
import Comments from "../../src/games/components/Comments";
import styles from "../../styles/game/gid.module.css";

const fetcher = async (input: RequestInfo, init: RequestInit) => {
  const res = await fetch(input, init);
  return res.json();
};

const addZero = (num: number): string => {
  return num < 10 ? "0" + num : "" + num;
};

const getKorDate = (createdSeconds: number) => {
  const date = new Date(createdSeconds * 1000);
  return `${date.getFullYear()}.${
    date.getMonth() + 1
  }.${date.getDate()} ${addZero(date.getHours())}:${addZero(
    date.getMinutes()
  )}:${addZero(date.getSeconds())}`;
};

const GamePage = () => {
  const router = useRouter();
  const { data: game } = useSWR(`/api/game/${router.query.gid}`, fetcher);

  if (!game)
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );

  return (
    <div className={styles.container}>
      <Head>
        <title>{game.title} - 차근차근 게임 공유 커뮤니티</title>
      </Head>
      <Header size="huge">{game.title}</Header>
      <p>
        {game.uname} | {getKorDate(game.createdAt._seconds)}
      </p>
      <p>
        <strong>{game.gid}</strong> | <strong>{game.pid}</strong>
      </p>
      {game.imageUrls && <Image src={game.imageUrls[0]} size="huge" centered />}
      <p
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: game.content }}
      />
      <Comments game={game} />
    </div>
  );
};

export default GamePage;
