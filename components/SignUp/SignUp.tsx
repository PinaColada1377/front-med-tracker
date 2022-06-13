import React from "react";
import { SignUpProps } from "./SignUp.props";
import styles from "./SignUp.module.css";
import { Divider } from "../Divider/Divider";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { Card } from "../Card/Card";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { useForm } from "react-hook-form";

interface ISignUpForm {
  email: string;
  password: string;
}

export const SignUp = ({}: SignUpProps): JSX.Element => {
  const SIGN_UP_URL = "/api/proxy/v1/auth/sign-up";

  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmitForm = async () => {
    const userPayload = {
      email,
      password,
    };

    try {
      await axios.post(SIGN_UP_URL, userPayload);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <>
      <Card style={{ marginTop: "1.22rem", padding: "1rem" }}>
        <form className={styles.signInForm} onSubmit={handleSubmitForm}>
          <Input
            type="email"
            value={email}
            name="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            value={password}
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button appearance={"primary"}>Sign up</Button>
        </form>
      </Card>
    </>
  );
};
