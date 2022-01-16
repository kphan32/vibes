import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useVibeCheckPage = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (submitted) {
      setTimeout(() => router.push("/"), 1500);
    }
  }, [submitted, router]);

  return { submitted, setSubmitted };
};

export default useVibeCheckPage;
