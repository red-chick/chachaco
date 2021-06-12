import { Button, Container, Menu } from "semantic-ui-react";
import Link from "next/link";
import { useUserContext } from "../../common/contexts/UserContext";

const Header = () => {
  const {
    state: { user, loading },
    logout,
  } = useUserContext();

  return (
    <Menu fixed={"top"} size="large">
      <Container>
        <Menu.Item active>Home</Menu.Item>
        <Menu.Item position="right">
          {user && <Button onClick={() => logout()}>Log out</Button>}
          {!loading && !user && (
            <>
              <Link href="/login">
                <Button>Log in</Button>
              </Link>
              <Link href="/signup">
                <Button primary={true} style={{ marginLeft: "0.5em" }}>
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Header;
