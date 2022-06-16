import { NextPage } from "next";
import React from "react";
import { Button, SignIn, SignUp } from "../components";
import styles from "../styles/auth.module.css";

const AuthPage: NextPage = () => {
  // sign-in = true
  // sign-up = false
  const [isSignIn, setIsSignIn] = React.useState(true);

  return (
    <>
      <div className="wrapper">
        <div className={styles.authButtons}>
          <Button
            appearance={isSignIn ? "primary" : "ghost"}
            onClick={() => setIsSignIn(true)}
          >
            Sign in
          </Button>
          <Button
            appearance={!isSignIn ? "primary" : "ghost"}
            onClick={() => setIsSignIn(false)}
          >
            Sign up
          </Button>
        </div>
        {isSignIn ? (
          <>
            <h1>Sign In</h1>
            <SignIn />
          </>
        ) : (
          <>
            <h1>Sign Up</h1>
            <SignUp setIsSignIn={setIsSignIn}/>
          </>
        )}
      </div>
    </>
  );
};

export default  AuthPage;