import { useState } from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";

import { useUserContext } from "../common/contexts/UserContext";
import { GameType } from "../common/firebase/type";
import useMySWR from "../common/hooks/useMySWR";
import { getKorDate } from "../common/utils/date";
import { deleteGameComment, postGameComment } from "../common/utils/fetchUtils";

type Props = {
  game: GameType;
};

const Comments = ({ game }: Props) => {
  const {
    state: { user },
  } = useUserContext();

  const [comment, setComment] = useState("");

  const { data: comments, trigger } = useMySWR(`/api/comments/${game.id}`);

  const submit = async () => {
    if (!comment) return;

    try {
      await postGameComment(game.id, user.uid, user.displayName, comment);

      setComment("");

      await trigger();
    } catch (error) {
      alert("덧글 작성에 실패하였습니다. 잠시후 다시 이용해주세요.");
      console.error(error);
    }
  };

  const remove = async (commentId: string) => {
    try {
      await deleteGameComment(commentId);
      trigger();
    } catch (error) {
      alert("삭제에 실패하였습니다. 잠시 후 다시 이용해주세요.");
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
              {user && comment.uid === user.uid && (
                <Comment.Actions>
                  <Comment.Action onClick={() => remove(comment.id)}>
                    삭제
                  </Comment.Action>
                </Comment.Actions>
              )}
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
