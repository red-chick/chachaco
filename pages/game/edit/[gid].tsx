import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Button,
  Dimmer,
  Form,
  Header,
  Icon,
  List,
  Loader,
  Message,
} from "semantic-ui-react";
import { useUserContext } from "../../../src/common/contexts/UserContext";
import styles from "../../../styles/game/edit.module.css";
import firebase from "firebase/app";
import "firebase/storage";

function getExt(filename: string) {
  return filename
    .substring(filename.lastIndexOf("."), filename.length)
    .toLowerCase();
}

export const checkYoutubeUrl = (gid: string) => {
  var exptext =
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
  if (exptext.test(gid) == false) {
    return false;
  }
  return true;
};

export const checkGid = (gid: string) => {
  var exptext = /^G\-[A-Z0-9]{3}\-[A-Z0-9]{3}\-[A-Z0-9]{3}$/;
  if (exptext.test(gid) == false) {
    return false;
  }
  return true;
};

export const checkPid = (gid: string) => {
  var exptext = /^P\-[A-Z0-9]{3}\-[A-Z0-9]{3}\-[A-Z0-9]{3}$/;
  if (exptext.test(gid) == false) {
    return false;
  }
  return true;
};

const EditGamePage = () => {
  const router = useRouter();
  const {
    state: { user },
  } = useUserContext();

  const [docId, setDocId] = useState("");
  const [title, setTitle] = useState("");
  const [gid, setGid] = useState("");
  const [pid, setPid] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [images, setImages] = useState([]);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [maker, setMaker] = useState("");
  const [source, setSource] = useState("");
  const [uid, setUid] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (router.query.gid) {
      (async () => {
        const res = await fetch(`/api/game/${router.query.gid}`);
        const game = await res.json();
        setDocId(game.id);
        setTitle(game.title);
        setGid(game.gid);
        setPid(game.pid || "");
        setContent(game.content.replace(/\<br \/\>/g, "\n") || "");
        setTags((game.tags || []).join(" "));
        setImages(game.images || []);
        setYoutubeUrl(game.youtubeUrl || "");
        setMaker(game.maker || "");
        setSource(game.source || "");
        setUid(game.uid || "");
      })();
    }
  }, [router.query.gid]);

  useEffect(() => {
    if (user && uid && user.uid !== uid) router.push("/");
  }, [user, uid]);

  const uploadImageToFirebaseStorage = async (file) => {
    const filename = `${user.uid}_${Date.now()}${getExt(file.name)}`;
    await firebase.storage().ref(`images/${filename}`).put(file);
    const url = await firebase
      .storage()
      .ref(`images/${filename}`)
      .getDownloadURL();
    return url;
  };

  const uploadFiles = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setUploadingImage(true);

      const promises = [...files].map(async (file) => {
        const url = await uploadImageToFirebaseStorage(file);
        setImages((images) =>
          !images
            ? [{ originName: file.name, url }]
            : [...images, { originName: file.name, url }]
        );
      });

      await Promise.all(promises);

      setUploadingImage(false);
    }
  };

  const imageUp = (index) => {
    setImages((images) => {
      const newImage = [...images];
      [newImage[index], newImage[index - 1]] = [
        newImage[index - 1],
        newImage[index],
      ];
      return newImage;
    });
  };

  const imageDown = (index) => {
    setImages((images) => {
      const newImage = [...images];
      [newImage[index], newImage[index + 1]] = [
        newImage[index + 1],
        newImage[index],
      ];
      return newImage;
    });
  };

  const submit = async () => {
    if (!docId || !title || !gid || isSubmit) return;
    setIsSubmit(true);
    try {
      const res = await fetch(`/api/game/${docId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          docId,
          title,
          pid,
          content: content.replace(/\r\n|\r|\n/g, "<br />"),
          tags: tags.trim() ? tags.trim().split(" ") : [],
          youtubeUrl,
          images,
          maker,
          source,
        }),
      });
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

  const removeImage = (index: number) => {
    setImages((images) => images.filter((_, i) => index !== i));
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
        <title>게임 수정 - 차차코 게임 공유</title>
        <meta property="og:title" content="게임 수정 - 차차코 게임 공유" />
      </Head>
      <Header size="huge">게임 수정</Header>
      <Form onSubmit={submit}>
        <Form.Field>
          <label>
            게임 제목 <span className={styles.gray}>(필수)</span>
          </label>
          <input
            placeholder="게임 제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>
            게임 ID <span className={styles.gray}>(필수) (수정 불가)</span>
          </label>
          <input value={gid} readOnly></input>
        </Form.Field>
        <Form.Field>
          <label>
            프로그래머 ID <span className={styles.gray}>(선택)</span>
          </label>
          <Form.Input
            fluid
            error={
              pid && !checkPid(pid)
                ? "프로그래머 ID 형식이 올바르지 않습니다."
                : null
            }
            placeholder="P-000-000-000"
            value={pid}
            onChange={(e) => setPid(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>
            게임 설명 <span className={styles.gray}>(선택)</span>
          </label>
          <textarea
            placeholder="게임 설명을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>
            태그 입력{" "}
            <span className={styles.gray}>(선택) (띄어쓰기로 구분)</span>
          </label>
          <Form.Input
            fluid
            placeholder="2D 3D 1인칭_FPS 격투 등"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>
            이미지 추가{" "}
            <span className={styles.gray}>
              (선택) (16:9 사이즈 권장) (첫번째 이미지를 썸네일로 이용)
            </span>
          </label>
          <input
            type="file"
            name="file"
            onChange={uploadFiles}
            accept="image/*"
            multiple
          />
        </Form.Field>
        <List as="ol">
          {images.map((image, index) => (
            <List.Item key={image.originName} as="li">
              <List.Content verticalAlign="middle">
                {index === 0 ? "(썸네일) " : ""}
                {image.originName}
                {index > 0 && (
                  <Icon
                    name="arrow alternate circle up outline"
                    className={styles.arrowButton}
                    onClick={() => imageUp(index)}
                  />
                )}
                {images.length > 1 && index < images.length - 1 && (
                  <Icon
                    name="arrow alternate circle down outline"
                    className={styles.arrowButton}
                    onClick={() => imageDown(index)}
                  />
                )}
                <Icon
                  name="remove circle"
                  className={styles.removeIcon}
                  onClick={() => removeImage(index)}
                />
              </List.Content>
            </List.Item>
          ))}
        </List>
        {uploadingImage && <Message>이미지를 업로드하는 중입니다...</Message>}
        <Form.Field>
          <label>
            유튜브 영상 <span className={styles.gray}>(선택)</span>
          </label>
          <Form.Input
            fluid
            error={
              youtubeUrl && !checkYoutubeUrl(youtubeUrl)
                ? "유튜브 URL 형식이 올바르지 않습니다."
                : null
            }
            placeholder="유튜브 영상의 링크를 입력해주세요"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>
            제작자 <span className={styles.gray}>(선택)</span>
          </label>
          <Form.Input
            fluid
            placeholder="제작자의 이름을 입력해주세요"
            value={maker}
            onChange={(e) => setMaker(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>
            출처 <span className={styles.gray}>(선택)</span>
          </label>
          <Form.Input
            fluid
            placeholder="출처를 입력해주세요"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </Form.Field>
        <Button
          type="submit"
          color="yellow"
          disabled={
            !title ||
            !gid ||
            uploadingImage ||
            !checkGid(gid) ||
            (pid && !checkPid(pid))
          }
          loading={isSubmit}
        >
          수정
        </Button>
      </Form>
    </div>
  );
};

export default EditGamePage;
