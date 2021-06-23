import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "semantic-ui-react";

type Props = {
  id: string;
  gid: string;
};

const RemoveAndEditButtons = ({ id, gid }: Props) => {
  const router = useRouter();

  const [loadingRemove, setLoadingRemove] = useState(false);

  const remove = async () => {
    if (loadingRemove) return;

    try {
      setLoadingRemove(true);

      await fetch(`/api/game/${id}`, {
        method: "DELETE",
      });

      alert("삭제에 성공하였습니다.");

      router.push("/");
    } catch (error) {
      alert("삭제에 실패하였습니다. 잠시 후 다시 이용해주세요.");
    }
  };

  return (
    <>
      <Button floated="right" onClick={remove} loading={loadingRemove}>
        삭제
      </Button>
      <Link href={`/game/edit/${gid}`}>
        <Button floated="right">수정</Button>
      </Link>
    </>
  );
};

export default RemoveAndEditButtons;
