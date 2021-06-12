import { Button, Container, Menu } from "semantic-ui-react";

const Header = () => {
  return (
    <Menu fixed={"top"} size="large">
      <Container>
        <Menu.Item as="a" active>
          Home
        </Menu.Item>
        <Menu.Item position="right">
          <Button as="a">Log in</Button>
          <Button as="a" primary={true} style={{ marginLeft: "0.5em" }}>
            Sign Up
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Header;
