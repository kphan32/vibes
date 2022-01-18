import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useVibeCheckPage = () => {
  const [pushCreated, setPushCreated] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (submitted && !pushCreated) {
      setTimeout(() => router.push("/"), 1000);
      setPushCreated(true);
    }
  }, [submitted, router, pushCreated, setPushCreated]);

  return { submitted, setSubmitted };
};

export default useVibeCheckPage;
