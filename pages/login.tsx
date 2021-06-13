import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import {
  Button,
  Dimmer,
  Form,
  Loader,
  Message,
  Segment,
} from "semantic-ui-react";

import { useUserContext } from "../src/common/contexts/UserContext";

import styles from "../styles/login.module.css";
import Link from "next/link";
import Head from "next/head";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useUserContext();

  const submit = async () => {
    try {
      setLoading(true);
      await login(email, password);
      router.push("/");
    } catch (error) {
      const { code } = error;
      console.log("code", code);
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
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>로그인 - 차근차근 게임 공유 커뮤니티</title>
      </Head>
      <div className={styles.formWrapper}>
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
              로그인
            </Button>
          </Segment>
        </Form>
        <Message className={styles.message}>
          계정이 없으신가요? <Link href="/signup">회원가입</Link>
        </Message>
      </div>
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
    </div>
  );
};

export default LoginPage;
