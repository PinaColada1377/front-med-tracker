import React from "react";
import styles from "./SignIn.module.css";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { Card } from "../Card/Card";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import * as yup from "yup";
import { ValidationError } from "yup";
import { useCookies } from 'react-cookie';
import { authCookie } from "../../constants/cookie";
import { SIGN_IN_URL } from "../../constants/url";

const schema = yup.object().shape({
  password: yup
    .string()
    .required("No password provided.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?:&_;-])[A-Za-z\d@$!%*?:&_;-]+$/,
      'Incorrect password'
    ),
  email: yup.string().email().required("No email provided."),
});

export const SignIn = (): JSX.Element => {
  const [_, setCookie] = useCookies([authCookie]);
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const resetErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const isValidForm = async () => {
    resetErrors();
    let isValid = true;

    try {
      await schema.validate({
        password,
        email,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        isValid = false;
        switch (error.path) {
          case "email":
            setEmailError(error.errors[0]);
            break;
          case "password":
            setPasswordError(error.errors[0]);
            break;
        }
      }
    }

    return isValid;
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const userPayload = {
      email,
      password,
    };

    if (await isValidForm()) {
      axios
        .post(SIGN_IN_URL, userPayload)
        .then((res) => {
          if(res.data.accessToken){
            setCookie(authCookie, res.data.accessToken);
          }
          router.push("/");
        })
        .catch(({ response }) => {
          alert(response.data.message[0].message);
        });
    }
  };

  return (
    <>
      <Card className={styles.card}>
        <form className={styles.signInForm} onSubmit={handleSubmitForm}>
          <Input
            type="email"
            value={email}
            name="Email"
            errorMessage={emailError}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            value={password}
            name="Password"
            errorMessage={passwordError}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className={styles.signInButton}
            appearance="primary"
            type="submit"
          >
            Sign In
          </Button>
        </form>
      </Card>
    </>
  );
};
