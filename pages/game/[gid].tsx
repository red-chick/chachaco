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
import useSWR, { trigger } from "swr";
import { useUserContext } from "../../src/common/contexts/UserContext";
import Comments from "../../src/games/components/Comments";
import styles from "../../styles/game/gid.module.css";

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
  const {
    state: { user },
  } = useUserContext();

  const [game, setGame] = useState(null);
  const [loadingLikes, setLoadingLikes] = useState([]);
  const [loadingRemove, setLoadingRemove] = useState(false);

  useEffect(() => {
    if (router.query.gid) {
      (async () => {
        const res = await fetch(`/api/game/${router.query.gid}`);
        const game = await res.json();
        setGame(game);
      })();
    }
  }, [router.query.gid]);

  if (!game)
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );

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
    await trigger(`/api/game/${router.query.gid}`);
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
    await trigger(`/api/game/${router.query.gid}`);
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

  return (
    <div className={styles.container}>
      <Head>
        <title>{game.title} - 차근차근 게임 공유 커뮤니티</title>
      </Head>
      <Header size="huge">{game.title}</Header>
      <p>{getKorDate(game.createdAt._seconds)}</p>
      <p>
        <strong>{game.gid}</strong> | <strong>{game.pid}</strong>
      </p>
      {game.imageUrls && <Image src={game.imageUrls[0]} size="huge" centered />}
      <p
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: game.content }}
      />
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
      {user.uid === game.uid && (
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

export default GamePage;
