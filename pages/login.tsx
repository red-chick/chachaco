import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Button, Dimmer, Form, Grid, Loader, Segment } from "semantic-ui-react";

import { useUserContext } from "../src/common/contexts/UserContext";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useUserContext();

  const submit = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/login?email=${email}&password=${password}`);

      if (res.status === 200) {
        const user = await res.json();
        login(user);
        router.push("/");
      } else {
        const { code } = await res.json();
        if (code === "auth/invalid-email") {
          alert("입력하신 이메일 주소의 형식이 올바르지 않습니다.");
        } else if (code === "auth/user-not-found") {
          alert("계정을 찾을 수 없습니다.");
        } else if (code === "auth/wrong-password") {
          alert("입력하신 비밀번호가 올바르지 않습니다.");
        } else {
          alert("에러가 발생했습니다. 잠시 후 다시 이용해주세요.");
        }
        setLoading(false);
      }
    } catch (error) {
      alert("에러가 발생했습니다. 잠시 후 다시 이용해주세요.");
      setLoading(false);
    }
  };

  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "100%", margin: 0 }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form size="large" onSubmit={submit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="이메일 주소를 입력해주세요"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="비밀번호를 입력해주세요"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                color="teal"
                fluid
                size="large"
                disabled={!email || !password}
              >
                Log in
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
    </>
  );
};

export default LoginPage;
