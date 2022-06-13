import React from "react";
import { SignInProps } from "./SignIn.props";
import styles from "./SignIn.module.css";
import { Divider } from "../Divider/Divider";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { Card } from "../Card/Card";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
// import { useForm } from "react-hook-form";

interface ISignInForm {
  email: string;
  password: string;
}

export const SignIn = ({}: SignInProps): JSX.Element => {
  const SIGN_IN_URL = "/api/proxy/v1/auth/sign-in";

  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  //   clearErrors,
  // } = useForm<ISignInForm>();

  const handleSubmitForm = async () => {
    const userPayload = {
      email,
      password,
    };

    try {
      const res = await axios.post(SIGN_IN_URL, userPayload);
      router.push("/");
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
          {/* <div className="inputWrapper">
            <span className="inputLabel">Email</span>
            <input
              {...register("email", {
                required: { value: true, message: "Write email" },
              })}
              type="email"
              placeholder={"email"}
              aria-invalid={errors.email ? true : false}
            />
            {errors.email && (
              <span role="alert" className="errorMessage">
                {errors.email.message}
              </span>
            )} */}
          {/* </div> */}

          {/* <div className="inputWrapper" style={{ margin: "1.4rem 0" }}>
            <span className="inputLabel">Password</span>
            <input
              {...register("password", {
                required: { value: true, message: "Write password" },
              })}
              type="password"
              placeholder={"password"}
              aria-invalid={errors.password ? true : false}
            />
            {errors.password && (
              <span role="alert" className="errorMessage">
                {errors.password.message}
              </span>
            )}
          </div> */}

          <Input
            type="password"
            value={password}
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button appearance={"primary"}>Sign in</Button>
        </form>
      </Card>
    </>
  );
};
