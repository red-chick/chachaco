import styles from "./Source.module.css";

type Props = {
  source: string;
};

const Source = ({ source }: Props) => {
  return (
    <p className={styles.source}>
      출처:{" "}
      <a href={source} target="_blank">
        {source}
      </a>
    </p>
  );
};

export default Source;
