import React from "react";
import { Up } from "../components";
import { MedicalList } from "../components/MedicalList/MedicalList";

import axios from "axios";
import { useRouter } from "next/dist/client/router";

function Home(): JSX.Element {
  const ME_URL = "/api/proxy/v1/auth/me";
  const router = useRouter();

  React.useEffect(() => {
    (async function () {
      try {
        const res = await axios.get(ME_URL).then((response) => response.data);
      } catch (err) {
        router.push('/');
      }
    })();
  }, []);

  return (
    <>
      <MedicalList />
      <Up />
    </>
  );
}

export default Home;
