import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

import styles from "../../styles/game/game.module.css";

import { useUserContext } from "../../src/common/contexts/UserContext";
import { GameType } from "../../src/common/firebase/type";
import { getGame, getGameFromServer } from "../../src/common/utils/fetchUtils";

import Comments from "../../src/game/Comments";
import Tags from "../../src/common/components/Tags";
import LikesButton from "../../src/common/components/LikesButton";
import Title from "../../src/game/Title";
import Information from "../../src/game/Information";
import Codes from "../../src/game/Codes";
import YoutubeVideo from "../../src/game/YoutubeVideo";
import Images from "../../src/game/Images";
import Source from "../../src/game/Source";
import Content from "../../src/game/Content";
import RemoveAndEditButtons from "../../src/game/RemoveAndEditButtons";
import { replaceBrTagWithLineBreak } from "../../src/common/utils/game";

type Props = {
  data: GameType;
};

const GamePage = ({ data }: Props) => {
  const router = useRouter();
  const {
    state: { user },
  } = useUserContext();

  const [game, setGame] = useState<GameType>(null);

  const fetchGame = async () => {
    const res = await getGame(router.query.gid);
    const game = await res.json();
    setGame(game);
  };

  useEffect(() => {
    setGame(data);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>{data.title} - 차차코 게임 공유</title>
        <meta
          property="og:title"
          content={`${data.title} - 차차코 게임 공유`}
        />
        {data.images && data.images.length > 0 ? (
          <meta property="og:image" content={data.images[0].url} />
        ) : (
          <meta
            property="og:image"
            content="https://www.chachaco.site/thumbnail.jpg"
          />
        )}
        {data.content && (
          <>
            <meta
              name="description"
              content={replaceBrTagWithLineBreak(data.content)}
            />
            <meta
              property="og:description"
              content={replaceBrTagWithLineBreak(data.content)}
            />
          </>
        )}
      </Head>
      {!game || !user ? (
        <Dimmer active>
          <Loader />
        </Dimmer>
      ) : (
        <>
          <Title title={game.title} />
          <Information maker={game.maker} seconds={game.createdAt._seconds} />
          <Codes gid={game.gid} pid={game.pid} />
          {game.youtubeUrl && <YoutubeVideo youtubeUrl={game.youtubeUrl} />}
          <Images images={game.images} />
          {game.source && <Source source={game.source} />}
          <Content content={game.content} />
          {game.tags && game.tags.length > 0 && (
            <Tags tags={game.tags} className={styles.tags} />
          )}
          <LikesButton game={game} trigger={fetchGame} />
          {user && game && user.uid === game.uid && (
            <RemoveAndEditButtons id={game.id} gid={game.gid} />
          )}
          <Comments game={game} />
        </>
      )}
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const { gid } = query;
  const res = await getGameFromServer(gid);
  const data = await res.json();
  return {
    props: { data },
  };
}

export default GamePage;
