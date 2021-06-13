import { Button, Container, Menu } from "semantic-ui-react";
import Link from "next/link";
import { useUserContext } from "../../common/contexts/UserContext";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const {
    state: { user, loading },
    logout,
  } = useUserContext();

  console.log(router.pathname);

  return (
    <Menu fixed={"top"} size="large">
      <Container style={{ height: "4rem" }}>
        <Link href="/">
          <Menu.Item active={router.pathname === "/"}>Home</Menu.Item>
        </Link>
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
