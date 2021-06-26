import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Dimmer, Header, Loader } from "semantic-ui-react";

import styles from "../../../styles/game/edit.module.css";

import { useUserContext } from "../../../src/common/contexts/UserContext";
import useGameForm from "../../../src/common/hooks/useGameForm";
import { replaceLineBreakWithBrTag } from "../../../src/common/utils/game";
import { getGame, patchGame } from "../../../src/common/utils/fetchUtils";

import GameForm from "../../../src/common/components/GameForm";

const EditGamePage = () => {
  const router = useRouter();
  const {
    state: { user },
  } = useUserContext();

  const gameFormState = useGameForm();
  const {
    title,
    gid,
    pid,
    content,
    tags,
    images,
    youtubeUrl,
    maker,
    source,
    docId,
    uid,
    setGameForm,
  } = gameFormState;

  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (router.query.gid) {
      (async () => {
        const res = await getGame(router.query.gid);
        const game = await res.json();
        setGameForm(game);
      })();
    }
  }, [router.query.gid]);

  useEffect(() => {
    if (user && uid && user.uid !== uid) router.push("/");
  }, [user, uid]);

  const submit = async () => {
    if (!docId || !title || !gid || isSubmit) return;
    setIsSubmit(true);
    try {
      const contentToDB = replaceLineBreakWithBrTag(content);
      const tagsToDB = tags.trim() ? tags.trim().split(" ") : [];

      const res = await patchGame(
        docId,
        title,
        pid,
        contentToDB,
        tagsToDB,
        youtubeUrl,
        images,
        maker,
        source
      );

      if (res.status === 200) {
        router.push(`/game/${gid}`);
      } else {
        alert("게임 수정에 실패하였습니다. 잠시후 다시 이용해주세요.");
        console.error(res.statusText);
      }
    } catch (error) {
      alert("게임 수정에 실패하였습니다. 잠시후 다시 이용해주세요.");
      console.error(error);
    } finally {
      setIsSubmit(false);
    }
  };

  if (!user || !docId)
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );

  return (
    <div className={styles.container}>
      <Head>
        <title>게임 수정 - 차근차근 게임 코딩 공유 커뮤니티</title>
        <meta
          property="og:title"
          content="게임 수정 - 차근차근 게임 코딩 공유 커뮤니티"
        />
        <meta
          name="description"
          content="차근차근 게임 코딩으로 제작한 게임들을 공유하는 커뮤니티 입니다."
        />
        <meta
          property="og:description"
          content="차근차근 게임 코딩으로 제작한 게임들을 공유하는 커뮤니티 입니다."
        />
        <meta
          property="og:image"
          content="https://www.chachaco.site/thumbnail.jpg"
        />
      </Head>
      <Header size="huge">게임 수정</Header>
      <GameForm
        gameFormState={gameFormState}
        submit={submit}
        isSubmit={isSubmit}
        isEditPage
      />
    </div>
  );
};

export default EditGamePage;
