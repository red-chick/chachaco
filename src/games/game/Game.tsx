import { Card } from "semantic-ui-react";
import { useRouter } from "next/router";
import Image from "next/image";

import styles from "./Game.module.css";

import { GameType } from "../../common/firebase/type";
import { getKorDate } from "../../common/utils/date";
import Tags from "../../common/components/Tags";
import LikesButton from "../../common/components/LikesButton";

type Props = {
  game: GameType;
  triggerGames: () => Promise<any>;
};

const Game = ({ game, triggerGames }: Props) => {
  const router = useRouter();

  return (
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
        <Card.Header className={styles.cardHeader}>{game.title}</Card.Header>
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

      {game.tags && game.tags.length > 0 && (
        <Card.Content extra>
          <Tags tags={game.tags} />
        </Card.Content>
      )}

      <Card.Content extra>
        <LikesButton game={game} trigger={triggerGames} />
      </Card.Content>
    </Card>
  );
};

export default Game;
