import { useState } from "react";
import { Button, Icon, Label } from "semantic-ui-react";

import { GameType } from "../firebase/type";
import { useUserContext } from "../contexts/UserContext";

type Props = {
  game: GameType;
  trigger: () => Promise<any>;
};

const LikesButton = ({ game, trigger }: Props) => {
  const {
    state: { user },
  } = useUserContext();

  const [loadingLike, setLoadingLike] = useState(false);

  const like = async (id: string) => {
    setLoadingLike(true);

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

    await trigger();

    setLoadingLike(false);
  };

  const unlike = async (id: string) => {
    setLoadingLike(true);

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

    await trigger();

    setLoadingLike(false);
  };

  return (
    <Button as="div" labelPosition="left">
      <Label
        basic
        color={user && game.likesUids.includes(user.uid) ? "red" : null}
        onClick={(e) => {
          e.stopPropagation();
          if (!user || loadingLike) return;
          game.likesUids.includes(user.uid) ? unlike(game.id) : like(game.id);
        }}
      >
        {game.likesCount}
      </Label>
      <Button
        icon
        loading={loadingLike}
        onClick={(e) => {
          e.stopPropagation();
          if (!user || loadingLike) return;
          game.likesUids.includes(user.uid) ? unlike(game.id) : like(game.id);
        }}
        color={user && game.likesUids.includes(user.uid) ? "red" : null}
      >
        <Icon name="heart" />
      </Button>
    </Button>
  );
};

export default LikesButton;
