import styles from "./Content.module.css";

type Props = {
  content: string;
};

const Content = ({ content }: Props) => {
  return (
    <p
      className={styles.content}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default Content;
