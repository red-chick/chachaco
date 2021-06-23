import ReactPlayer from "react-player";

import styles from "./YoutubeVideo.module.css";

type Props = {
  youtubeUrl: string;
};

const YoutubeVideo = ({ youtubeUrl }: Props) => {
  return (
    <div className={styles.wrapper}>
      <ReactPlayer
        className={styles.player}
        url={youtubeUrl}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default YoutubeVideo;
