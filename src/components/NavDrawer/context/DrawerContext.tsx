import { createContext } from "react";

interface DrawerContextInterface {
  open: boolean;
  closed: boolean;
  toggleOpen: () => void;
  setOpen: (open: boolean) => void;
}

const DrawerContext = createContext<DrawerContextInterface | null>(null);

export default DrawerContext;

export type { DrawerContextInterface };
