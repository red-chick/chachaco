import {
  Button,
  Dimmer,
  Form,
  Header,
  Loader,
  Message,
} from "semantic-ui-react";
import firebase from "firebase";

import styles from "../../styles/game/add.module.css";
import { useState } from "react";
import { useUserContext } from "../../src/common/contexts/UserContext";
import { useRouter } from "next/router";

function getExt(filename: string) {
  return filename
    .substring(filename.lastIndexOf("."), filename.length)
    .toLowerCase();
}

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

const GameAddPage = () => {
  const router = useRouter();
  const {
    state: { user },
  } = useUserContext();

  const [title, setTitle] = useState("");
  const [gid, setGid] = useState("");
  const [pid, setPid] = useState("");
  const [content, setContent] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadingImage(true);
      const filename = `${user.uid}_${Date.now()}${getExt(file.name)}`;
      await firebase.storage().ref(`images/${filename}`).put(file);
      const url = await firebase
        .storage()
        .ref(`images/${filename}`)
        .getDownloadURL();
      setImageUrl(url);
      setUploadingImage(false);
    } else {
      setImageUrl("");
      setUploadingImage(false);
    }
  };

  const submit = async () => {
    if (!title || !gid || !pid || !content) return;
    try {
      const res = await fetch("/api/game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          uname: user.displayName,
          title,
          gid,
          pid,
          content: content.replace(/\r\n|\r|\n/g, "<br />"),
          imageUrl,
        }),
      });
      console.log(res);
      if (res.status === 200) {
        alert("게임이 업로드 되었습니다.");
        router.push("/");
      } else if (res.status === 409) {
        alert("이미 등록되어 있는 게임 ID 입니다.");
      } else {
        alert("게임 업로드에 실패하였습니다. 잠시후 다시 이용해주세요.");
        console.error(res.statusText);
      }
    } catch (error) {
      alert("게임 업로드에 실패하였습니다. 잠시후 다시 이용해주세요.");
      console.error(error);
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
      <Header size="huge">게임 등록</Header>
      <Form onSubmit={submit}>
        <Form.Field>
          <label>게임 제목 *</label>
          <input
            placeholder="게임 제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>게임 ID *</label>
          <Form.Input
            fluid
            error={
              gid && !checkGid(gid) ? "게임 ID 형식이 올바르지 않습니다." : null
            }
            placeholder="G-000-000-000"
            value={gid}
            onChange={(e) => setGid(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>프로그래머 ID *</label>
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
          <label>게임 설명 *</label>
          <textarea
            placeholder="게임 설명을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>이미지 추가</label>
          <input
            type="file"
            name="file"
            onChange={uploadFile}
            accept="image/*"
          />
        </Form.Field>
        {uploadingImage && <Message>이미지를 업로드하는 중입니다...</Message>}
        {imageUrl && (
          <Message positive>이미지 업로드에 성공하였습니다.</Message>
        )}
        <Button
          type="submit"
          disabled={
            !title ||
            !gid ||
            !pid ||
            !content ||
            uploadingImage ||
            !checkGid(gid) ||
            !checkPid(pid)
          }
        >
          등록
        </Button>
      </Form>
    </div>
  );
};

export default GameAddPage;
