import { Button, Container, Icon, Menu } from "semantic-ui-react";
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
          <Menu.Item active={router.pathname === "/"}>
            <strong>게임 목록</strong>
          </Menu.Item>
        </Link>
        <Menu.Item position="right">
          {user && (
            <>
              <Link href="/game/add">
                <Button icon>
                  <Icon name="plus" />
                </Button>
              </Link>
              <Button onClick={() => logout()} style={{ marginLeft: "0.5em" }}>
                로그아웃
              </Button>
            </>
          )}
          {!loading && !user && (
            <>
              <Link href="/login">
                <Button>로그인</Button>
              </Link>
              <Link href="/signup">
                <Button primary={true} style={{ marginLeft: "0.5em" }}>
                  회원가입
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
