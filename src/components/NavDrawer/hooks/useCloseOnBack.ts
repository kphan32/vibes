import { useRouter } from "next/router";
import useNavDrawerContext from "./useNavDrawerContext";

const useCloseOnBack = () => {
  const { setOpen } = useNavDrawerContext();
  const router = useRouter();

  // Close on route change
  router.events?.on("routeChangeStart", () => {
    setOpen(false);
  });
};

export default useCloseOnBack;
