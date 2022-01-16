import { useEffect, useState } from "react";

const useVibeCheckPage = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        console.info("Redirect");
      }, 1000);
    }
  }, [submitted]);

  return { submitted, setSubmitted };
};

export default useVibeCheckPage;
