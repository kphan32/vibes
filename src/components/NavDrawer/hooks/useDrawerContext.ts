import { useContext } from "react";
import DrawerContext, {
  DrawerContextInterface,
} from "../context/DrawerContext";

const useDrawerContext = (): DrawerContextInterface => {
  const drawerCtx = useContext(DrawerContext);

  if (drawerCtx === null) {
    throw "Drawer context is null";
  }

  return drawerCtx;
};

export default useDrawerContext;
