import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { Button, Dimmer, Form, Loader, Segment } from "semantic-ui-react";

import { checkEmail } from "../src/signup/utils";

import styles from "../styles/signup.module.css";

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validation = () => {
    if (
      !email ||
      !checkEmail(email) ||
      !nickname ||
      nickname.length < 3 ||
      !password ||
      password.length < 8 ||
      password !== checkPassword
    )
      return false;
    return true;
  };

  const submit = async () => {
    if (!validation()) return;

    try {
      setLoading(true);

      const res = await fetch("api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          nickname,
        }),
      });

      if (res.status === 200) {
        router.push("/login");
      } else {
        const { code } = await res.json();
        if (code === "auth/email-already-in-use") {
          alert("이미 가입되어 있는 이메일입니다.");
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
    <div className={styles.container}>
      <Form size="large" onSubmit={submit}>
        <Segment stacked>
          <Form.Input
            fluid
            error={
              email && !checkEmail(email)
                ? "이메일 형식이 올바르지 않습니다."
                : null
            }
            icon="user"
            iconPosition="left"
            type="email"
            placeholder="이메일 주소를 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Input
            fluid
            error={
              nickname && nickname.length < 3
                ? "닉네임은 3글자 이상이어야 합니다."
                : null
            }
            icon="user"
            iconPosition="left"
            placeholder="닉네임을 입력해주세요"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Form.Input
            fluid
            error={
              password && password.length < 8
                ? "비밀번호는 8자리 이상이어야 합니다."
                : null
            }
            icon="lock"
            iconPosition="left"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Input
            fluid
            error={
              checkPassword && checkPassword !== password
                ? "비밀번호가 일치하지 않습니다."
                : null
            }
            icon="lock"
            iconPosition="left"
            placeholder="비밀번호를 다시 한번 입력해주세요"
            type="password"
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
          />
          <Button
            color="teal"
            fluid
            size="large"
            disabled={!email || !password || password !== checkPassword}
          >
            Sign Up
          </Button>
        </Segment>
      </Form>
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
    </div>
  );
};

export default SignUpPage;
