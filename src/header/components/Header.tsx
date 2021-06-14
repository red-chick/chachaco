import { Button, Container, Icon, Menu } from "semantic-ui-react";
import Link from "next/link";
import { useUserContext } from "../../common/contexts/UserContext";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const {
    state: { user },
  } = useUserContext();

  return (
    <Menu fixed={"top"} size="large">
      <Container style={{ height: "4rem" }}>
        <Link href="/">
          <Menu.Item active={router.pathname === "/"}>
            <strong>게임 목록</strong>
          </Menu.Item>
        </Link>
        <Menu.Item position="right">
          {user && router.pathname !== "/game/add" && (
            <>
              <Link href="/game/add">
                <Button primary>게임 등록</Button>
              </Link>
            </>
          )}
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Header;
