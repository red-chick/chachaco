import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Dimmer, Header, Loader } from "semantic-ui-react";

import styles from "../../styles/game/add.module.css";

import { useUserContext } from "../../src/common/contexts/UserContext";
import useGameForm from "../../src/common/hooks/useGameForm";
import { replaceLineBreakWithBrTag } from "../../src/common/utils/game";
import { postGame } from "../../src/common/utils/fetchUtils";

import GameForm from "../../src/common/components/GameForm";

const GameAddPage = () => {
  const router = useRouter();
  const {
    state: { user },
  } = useUserContext();

  const gameFormState = useGameForm();
  const { title, gid, pid, content, tags, images, youtubeUrl, maker, source } =
    gameFormState;

  const [isSubmit, setIsSubmit] = useState(false);

  const submit = async () => {
    if (!title || !gid || isSubmit) return;
    setIsSubmit(true);
    try {
      const { uid, displayName } = user;
      const contentToDB = replaceLineBreakWithBrTag(content);
      const tagsToDB = tags.trim() ? tags.trim().split(" ") : [];

      const res = await postGame(
        uid,
        displayName,
        title,
        gid,
        pid,
        contentToDB,
        tagsToDB,
        images,
        youtubeUrl,
        maker,
        source
      );

      if (res.status === 200) {
        alert("게임이 등록 되었습니다.");
        router.push(`/game/${gid}`);
      } else if (res.status === 409) {
        alert("이미 등록되어 있는 게임 ID 입니다.");
      } else {
        alert("게임 등록에 실패하였습니다. 잠시후 다시 이용해주세요.");
        console.error(res.statusText);
      }
    } catch (error) {
      alert("게임 등록에 실패하였습니다. 잠시후 다시 이용해주세요.");
      console.error(error);
    } finally {
      setIsSubmit(false);
    }
  };

  if (!user)
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );

  return (
    <div className={styles.container}>
      <Head>
        <title>게임 등록 - 차차코 게임 공유</title>
        <meta property="og:title" content="게임 등록 - 차차코 게임 공유" />
      </Head>
      <Header size="huge">게임 등록</Header>
      <GameForm
        gameFormState={gameFormState}
        submit={submit}
        isSubmit={isSubmit}
      />
    </div>
  );
};

export default GameAddPage;
