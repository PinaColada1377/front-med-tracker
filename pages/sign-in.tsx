import React from "react";
import { SignIn } from "../components/SignIn/SignIn";
import SignUp from "./sign-up";

export default function SignInPage() {
  return (
    <>
      <div className="wrapper">
        <h1>Sign In</h1>
        <SignIn />
        <SignUp />
      </div>
    </>
  );
}
