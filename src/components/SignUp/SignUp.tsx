import React from "react";
import styles from "./SignUp.module.css";
import axios from "axios";
import { Card } from "../Card/Card";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import * as yup from "yup";
import { ValidationError } from "yup";
import { SIGN_UP_URL } from "../../constants/url";
import { SignUpProps } from "./SignUp.props";

const schema = yup.object().shape({
  password: yup
    .string()
    .required("No password provided.")
    .min(4, "Password is too short - should be 4 chars minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?:&_;-])[A-Za-z\d@$!%*?:&_;-]+$/,
      "Password must contain at least one lowercase, uppercase letter, number, special character"
    ),
  email: yup.string().email().required("No email provided."),
});

export const SignUp = ({ setIsSignIn }: SignUpProps): JSX.Element => {
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
        .post(SIGN_UP_URL, userPayload)
        .then(() => {
          setIsSignIn(true);
          setTimeout(() => alert("User successfully added!"), 500);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Card className={styles.card}>
        <form className={styles.signUpForm} onSubmit={handleSubmitForm}>
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
            className={styles.signUpButton}
            appearance="primary"
            type="submit"
          >
            Sign up
          </Button>
        </form>
      </Card>
    </>
  );
};
