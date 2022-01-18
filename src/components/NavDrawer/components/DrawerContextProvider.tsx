import { ReactNode } from "react";
import { useState } from "react";
import { FC } from "react";
import DrawerContext from "../context/DrawerContext";

interface DrawerContextProps {
  children: ReactNode | null;
}

const DrawerContextProvider: FC<DrawerContextProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((open) => !open);
  };

  return (
    <DrawerContext.Provider
      value={{
        open,
        closed: !open,
        toggleOpen,
        setOpen,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export default DrawerContextProvider;
