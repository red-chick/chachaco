import { useState } from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
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

const Comments = ({ game }) => {
  const [comment, setComment] = useState("");
  const {
    state: { user },
  } = useUserContext();

  const { data: comments } = useSWR(`/api/comments/${game.id}`, fetcher);

  const submit = async () => {
    if (!comment) return;

    try {
      await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameId: game.id,
          uid: user.uid,
          uname: user.displayName,
          comment,
        }),
      });
      setComment("");
      await trigger(`/api/comments/${game.id}`);
    } catch (error) {
      alert("덧글 작성에 실패하였습니다. 잠시후 다시 이용해주세요.");
      console.error(error);
    }
  };

  return (
    <Comment.Group>
      <Header as="h3" dividing>
        댓글
      </Header>

      {comments &&
        comments.map((comment) => (
          <Comment key={comment.id}>
            <Comment.Content>
              <Comment.Author as="a">익명</Comment.Author>
              <Comment.Metadata>
                <div>{getKorDate(comment.createdAt._seconds)}</div>
              </Comment.Metadata>
              <Comment.Text>{comment.comment}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}

      {user && (
        <Form reply onSubmit={submit}>
          <Form.Input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 입력해주세요."
          />
          <Button color="yellow" disabled={!comment}>
            댓글 작성
          </Button>
        </Form>
      )}
    </Comment.Group>
  );
};

export default Comments;
