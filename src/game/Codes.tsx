import { Label } from "semantic-ui-react";

import styles from "./Codes.module.css";

type Props = {
  gid: string;
  pid: string;
};

const Codes = ({ gid, pid }: Props) => {
  return (
    <div className={styles.codes}>
      <Label size="big" color="yellow">
        {gid}
      </Label>
      {pid && (
        <Label size="big" color="yellow">
          {pid}
        </Label>
      )}
    </div>
  );
};

export default Codes;
