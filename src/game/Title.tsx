import { Header } from "semantic-ui-react";

type Props = {
  title: string;
};

const Title = ({ title }: Props) => {
  return <Header size="huge">{title}</Header>;
};

export default Title;
