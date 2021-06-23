import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  Button,
  Card,
  Dimmer,
  Icon,
  Label,
  Loader,
  Menu,
} from "semantic-ui-react";

import styles from "./Games.module.css";

import { useUserContext } from "../common/contexts/UserContext";
import { getKorDate } from "../common/utils/date";
import { Game } from "../common/firebase/type";

type Props = {
  order: "createdAt" | "likesCount";
  setOrder: Dispatch<SetStateAction<"createdAt" | "likesCount">>;
  games: Game[];
  triggerGames: () => Promise<any>;
};

const Games = ({ order, setOrder, games, triggerGames }: Props) => {
  const {
    state: { user },
  } = useUserContext();
  const router = useRouter();

  const [loadingLikes, setLoadingLikes] = useState([]);

  if (!games)
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

    await triggerGames();

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

    await triggerGames();

    setLoadingLikes((ids) => ids.filter((_id) => _id !== id));
  };

  const changeMenu = async (order: "createdAt" | "likesCount") => {
    setOrder(order);
  };

  return (
    <>
      <Menu tabular>
        <Menu.Item
          name="최신순"
          active={order === "createdAt"}
          onClick={() => changeMenu("createdAt")}
        />
        <Menu.Item
          name="인기순"
          active={order === "likesCount"}
          onClick={() => changeMenu("likesCount")}
        />
      </Menu>
      <Card.Group>
        {games.map((game) => (
          <Card
            key={game.id}
            className={styles.card}
            onClick={() => router.push(`/game/${game.gid}`)}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={
                  game.images && game.images[0]
                    ? game.images[0].url
                    : "/error-image-generic.jpg"
                }
                width={"100%"}
                height={"100%"}
                quality={100}
              ></Image>
            </div>
            <Card.Content>
              <Card.Header className={styles.cardHeader}>
                {game.title}
              </Card.Header>
              <Card.Meta>
                {game.maker && <span>{game.maker} |</span>}
                <span>{getKorDate(game.createdAt._seconds)}</span>
              </Card.Meta>
              <Card.Description className={styles.cardDescription}>
                <strong>{game.gid}</strong>{" "}
                {game.pid && (
                  <>
                    | <strong>{game.pid}</strong>
                  </>
                )}
              </Card.Description>
            </Card.Content>
            {(game.tags || []).length > 0 && (
              <Card.Content extra>
                {game.tags.map((tag, i) => (
                  <Label key={i + tag}>{tag}</Label>
                ))}
              </Card.Content>
            )}

            <Card.Content extra>
              <Button as="div" labelPosition="left">
                <Label
                  basic
                  color={
                    user && game.likesUids.includes(user.uid) ? "red" : null
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!user || loadingLikes.includes(game.id)) return;
                    game.likesUids.includes(user.uid)
                      ? unlike(game.id)
                      : like(game.id);
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
                    game.likesUids.includes(user.uid)
                      ? unlike(game.id)
                      : like(game.id);
                  }}
                  color={
                    user && game.likesUids.includes(user.uid) ? "red" : null
                  }
                >
                  <Icon name="heart" />
                </Button>
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </>
  );
};

export default Games;
