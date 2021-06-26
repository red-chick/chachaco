import { Dispatch, SetStateAction } from "react";
import { Card, Dimmer, Loader, Menu } from "semantic-ui-react";

import { GameType } from "../common/firebase/type";

import Game from "./game/Game";

type Props = {
  order: "createdAt" | "likesCount";
  setOrder: Dispatch<SetStateAction<"createdAt" | "likesCount">>;
  games: GameType[];
  trigger: () => Promise<any>;
};

const Games = ({ order, setOrder, games, trigger }: Props) => {
  if (!games)
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );

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
          <Game game={game} trigger={trigger} />
        ))}
      </Card.Group>
    </>
  );
};

export default Games;
