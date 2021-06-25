import { useState } from "react";
import { Button, Icon, Label } from "semantic-ui-react";

import { GameType } from "../firebase/type";
import { useUserContext } from "../contexts/UserContext";
import { patchGameLike, patchGameUnLike } from "../utils/fetchUtils";

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

    await patchGameLike(id, user.uid);
    await trigger();

    setLoadingLike(false);
  };

  const unlike = async (id: string) => {
    setLoadingLike(true);

    await patchGameUnLike(id, user.uid);
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
