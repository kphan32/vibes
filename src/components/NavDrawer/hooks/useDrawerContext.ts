import { useContext } from "react";
import DrawerContext, {
  DrawerContextInterface,
} from "../context/DrawerContext";

const useDrawerContext = (): DrawerContextInterface => {
  const drawerCtx = useContext(DrawerContext);

  return drawerCtx;
};

export default useDrawerContext;
