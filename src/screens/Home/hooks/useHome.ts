import { useRouter } from "next/router";

const useHome = () => {
  const router = useRouter();

  const gotoVibeCheck = () => router.push("/vibe_check");

  return { gotoVibeCheck };
};

export default useHome;
