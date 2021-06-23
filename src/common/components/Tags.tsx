import { Label } from "semantic-ui-react";

type Props = {
  tags: string[];
  className?: string;
};

const Tags = ({ tags, className }: Props) => {
  return (
    <div className={className}>
      {tags.map((tag, i) => (
        <Label key={i + tag}>{tag}</Label>
      ))}
    </div>
  );
};

export default Tags;
