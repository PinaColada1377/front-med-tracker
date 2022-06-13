import "../styles/globals.css";
import Head from "next/head";
import React from "react";
import { AppProps } from "next/dist/shared/lib/router/router";

import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { Button } from "../components";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const ME_URL = "/api/proxy/v1/auth/me";
  const LOGOUT_URL = "/api/proxy/v1/auth/log-out";
  const router = useRouter();

  const [loginStatus, setLoginStatus] = React.useState(
    "initialLoginStatus" || "Loading..."
  );



  async function logOut() {
    setLoginStatus("Loading...");

    try {
      const res = await axios
        .post(LOGOUT_URL)
   
      router.push("/sign-in");
    } catch (err) {
      console.error(err);
    }

    getLoginStatus();
  }

  async function getLoginStatus() {
    setLoginStatus("Loading...");

    try {
      const res = await axios.get(ME_URL).then((response) => response.data);
      setLoginStatus(`Logged in as ${res.email}`);
    } catch (err) {
      setLoginStatus("Not logged in");

      router.push("/sign-in");
    }
  }
  React.useEffect(() => {
    getLoginStatus();
  }, []);
  return (
    <>
      <Head>
        <title>Medication</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="login-status">
        <p>{loginStatus}</p>
        <Button appearance="ghost" onClick={logOut}>
          Logout
        </Button>
      </div>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
