import { getKorDate } from "../common/utils/date";

type Props = {
  maker: string;
  seconds: number;
};

const Information = ({ maker, seconds }: Props) => {
  return (
    <p>
      {maker && <span>{maker} | </span>}
      {getKorDate(seconds)}
    </p>
  );
};

export default Information;
