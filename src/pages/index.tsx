import React from "react";
import { AuthStatus, Up, MedicationList } from "../components";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { ME_URL } from "../constants/url";
import { NextPage } from "next";


const HomePage: NextPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    (async function () {
      try {
        await axios
          .get(ME_URL, { withCredentials: true })
          .then((response) => response.data);
      } catch (err) {
        router.push("/auth");
      }
    })();
  }, []);

  return (
    <>
      <AuthStatus />
      <MedicationList />
      <Up />
    </>
  );
}

export default HomePage;
