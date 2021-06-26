import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Form, Icon, List, Message, Button } from "semantic-ui-react";

import styles from "./GameForm.module.css";

import { GameType, ImageType } from "../firebase/type";
import { checkGid, checkPid, checkYoutubeUrl } from "../utils/regex";

type Props = {
  gameFormState: {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    gid: string;
    setGid: Dispatch<SetStateAction<string>>;
    pid: string;
    setPid: Dispatch<SetStateAction<string>>;
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
    tags: string;
    setTags: Dispatch<SetStateAction<string>>;
    images: ImageType[];
    setImages: Dispatch<SetStateAction<ImageType[]>>;
    youtubeUrl: string;
    setYoutubeUrl: Dispatch<SetStateAction<string>>;
    maker: string;
    setMaker: Dispatch<SetStateAction<string>>;
    source: string;
    setSource: Dispatch<SetStateAction<string>>;
    docId: string;
    setDocId: Dispatch<SetStateAction<string>>;
    uid: string;
    setUid: Dispatch<SetStateAction<string>>;
    uploadingImage: boolean;
    setUploadingImage: Dispatch<SetStateAction<boolean>>;
    setGameForm: (game: GameType) => void;
    uploadImages: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
    moveImageUp: (index: number) => void;
    moveImageDown: (index: number) => void;
    removeImage: (index: number) => void;
  };
  submit: () => void;
  isSubmit: boolean;
  isEditPage?: boolean;
};

const GameForm = ({
  gameFormState,
  submit,
  isSubmit,
  isEditPage = false,
}: Props) => {
  const {
    title,
    setTitle,
    gid,
    setGid,
    pid,
    setPid,
    content,
    setContent,
    tags,
    setTags,
    images,
    youtubeUrl,
    setYoutubeUrl,
    maker,
    setMaker,
    source,
    setSource,
    uploadingImage,
    uploadImages,
    moveImageUp,
    moveImageDown,
    removeImage,
  } = gameFormState;

  return (
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
          게임 ID{" "}
          <span className={styles.gray}>
            (필수) {isEditPage && "(수정 불가)"}
          </span>
        </label>
        <Form.Input
          fluid
          error={
            gid && !checkGid(gid) ? "게임 ID 형식이 올바르지 않습니다." : null
          }
          placeholder="G-000-000-000"
          value={gid}
          onChange={(e) => setGid(e.target.value)}
          readOnly={isEditPage}
        />
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
          className={styles.fileInput}
          onChange={uploadImages}
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
                  onClick={() => moveImageUp(index)}
                />
              )}
              {images.length > 1 && index < images.length - 1 && (
                <Icon
                  name="arrow alternate circle down outline"
                  className={styles.arrowButton}
                  onClick={() => moveImageDown(index)}
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
          (pid && !checkPid(pid)) ||
          (youtubeUrl && !checkYoutubeUrl(youtubeUrl))
        }
        loading={isSubmit}
      >
        {isEditPage ? "수정" : "등록"}
      </Button>
    </Form>
  );
};

export default GameForm;
