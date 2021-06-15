import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Button,
  Dimmer,
  Header,
  Icon,
  Image,
  Label,
  Loader,
} from "semantic-ui-react";
import { useUserContext } from "../../src/common/contexts/UserContext";
import Comments from "../../src/games/components/Comments";
import styles from "../../styles/game/game.module.css";
import Slider from "react-slick";
import ReactPlayer from "react-player";

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

const sliderSettings = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const GamePage = ({ data }) => {
  const router = useRouter();
  const {
    state: { user },
  } = useUserContext();

  const [game, setGame] = useState(null);
  const [loadingLikes, setLoadingLikes] = useState([]);
  const [loadingRemove, setLoadingRemove] = useState(false);

  const fetchGame = async () => {
    const res = await fetch(`/api/game/${router.query.gid}`);
    const game = await res.json();
    setGame(game);
  };

  useEffect(() => {
    setGame(data);
  }, []);

  const like = async (id: string) => {
    setLoadingLikes((ids) => [...ids, id]);

    await fetch("/api/game/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        uid: user.uid,
      }),
    });
    await fetchGame();
    setLoadingLikes((ids) => ids.filter((_id) => _id !== id));
  };

  const unlike = async (id: string) => {
    setLoadingLikes((ids) => [...ids, id]);

    await fetch("/api/game/unlike", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        uid: user.uid,
      }),
    });
    await fetchGame();
    setLoadingLikes((ids) => ids.filter((_id) => _id !== id));
  };

  const remove = async () => {
    if (loadingRemove) return;

    try {
      setLoadingRemove(true);

      await fetch(`/api/game/${game.id}`, {
        method: "DELETE",
      });

      alert("삭제에 성공하였습니다.");

      router.push("/");
    } catch (error) {
      alert("삭제에 실패하였습니다. 잠시 후 다시 이용해주세요.");
    }
  };

  console.log(game);
  console.log(user);

  if (!game || !user)
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );

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
      </Head>
      <Header size="huge">{game.title}</Header>
      <p>
        {game.maker && <span>{game.maker} | </span>}
        {getKorDate(game.createdAt._seconds)}
      </p>
      <div className={styles.labels}>
        <Label size="big" color="yellow">
          {game.gid}
        </Label>
        {game.pid && (
          <Label size="big" color="yellow">
            {game.pid}
          </Label>
        )}
      </div>
      {game.youtubeUrl && (
        <div className={styles.playerWrapper}>
          <ReactPlayer
            className={styles.reactPlayer}
            url={game.youtubeUrl}
            width="100%"
            height="100%"
          />
        </div>
      )}
      <Slider {...sliderSettings}>
        {game.images &&
          game.images.map((image) => (
            <Image key={image.url} src={image.url} size="huge" centered />
          ))}
      </Slider>

      {game.source && (
        <p className={styles.source}>
          출처:{" "}
          <a href={game.source} target="_blank">
            {game.source}
          </a>
        </p>
      )}
      <p
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: game.content }}
      />
      {(game.tags || []).length > 0 && (
        <div className={styles.tags}>
          {game.tags.map((tag, i) => (
            <Label key={i + tag}>{tag}</Label>
          ))}
        </div>
      )}
      <Button as="div" labelPosition="left">
        <Label
          as="a"
          basic
          color={user && game.likesUids.includes(user.uid) ? "red" : null}
          onClick={(e) => {
            e.stopPropagation();
            if (!user || loadingLikes.includes(game.id)) return;
            game.likesUids.includes(user.uid) ? unlike(game.id) : like(game.id);
          }}
        >
          {game.likesCount}
        </Label>
        <Button
          icon
          loading={loadingLikes.includes(game.id)}
          onClick={(e) => {
            e.stopPropagation();
            if (!user || loadingLikes.includes(game.id)) return;
            game.likesUids.includes(user.uid) ? unlike(game.id) : like(game.id);
          }}
          color={user && game.likesUids.includes(user.uid) ? "red" : null}
        >
          <Icon name="heart" />
        </Button>
      </Button>
      {user && game && user.uid === game.uid && (
        <>
          <Button floated="right" onClick={remove} loading={loadingRemove}>
            삭제
          </Button>
          <Link href={`/game/edit/${game.gid}`}>
            <Button floated="right">수정</Button>
          </Link>
        </>
      )}

      <Comments game={game} />
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const { gid } = query;
  const res = await fetch(`http://localhost:3000/api/game/${gid}`);
  const data = await res.json();
  return {
    props: { data },
  };
}

export default GamePage;
