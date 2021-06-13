import Link from "next/link";
import { useState } from "react";
import {
  Button,
  Dimmer,
  Icon,
  Image,
  Item,
  Label,
  Loader,
} from "semantic-ui-react";
import useSWR, { trigger } from "swr";
import { useUserContext } from "../../common/contexts/UserContext";

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

const Games = () => {
  const {
    state: { user },
  } = useUserContext();

  const [loadingLikes, setLoadingLikes] = useState([]);

  const { data } = useSWR("/api/games", fetcher);

  if (!data)
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
    await trigger("/api/games");
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
    await trigger("/api/games");
    setLoadingLikes((ids) => ids.filter((_id) => _id !== id));
  };

  return (
    <Item.Group divided>
      {data.map((game) => (
        <Link href={`/game/${game.gid}`}>
          <Item style={{ cursor: "pointer" }}>
            <Image size="small" src={game.imageUrls[0]} error={""} />
            <Item.Content>
              <Item.Header>{game.title}</Item.Header>
              <Item.Description>
                {game.uname} | {getKorDate(game.createdAt._seconds)}
              </Item.Description>
              <Item.Description>
                <strong>{game.gid}</strong> | <strong>{game.pid}</strong>
              </Item.Description>
              <Item.Extra>
                <Button as="div" labelPosition="left">
                  <Label
                    as="a"
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
              </Item.Extra>
            </Item.Content>
          </Item>
        </Link>
      ))}
    </Item.Group>
  );
};

export default Games;
