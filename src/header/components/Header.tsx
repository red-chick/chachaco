import { Button, Container, Menu } from "semantic-ui-react";
import Link from "next/link";

const Header = () => {
  return (
    <Menu fixed={"top"} size="large">
      <Container>
        <Menu.Item as="a" active>
          Home
        </Menu.Item>
        <Menu.Item position="right">
          <Button as="a">Log in</Button>
          <Link href="/signup">
            <Button as="a" primary={true} style={{ marginLeft: "0.5em" }}>
              Sign Up
            </Button>
          </Link>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Header;
