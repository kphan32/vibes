import { FC, ReactNode } from "react";
import NavDrawer from "./NavDrawer";
import DrawerContextProvider from "./NavDrawer/components/DrawerContextProvider";
import useDrawerContext from "./NavDrawer/hooks/useDrawerContext";

interface NavDrawerContentProps {
  children: ReactNode;
}

const NavDrawerContent: FC<NavDrawerContentProps> = ({ children }) => {
  const { open, toggleOpen } = useDrawerContext();
  return (
    <div
      className="flex flex-1"
      onClick={() => {
        if (open) {
          toggleOpen();
        }
      }}
    >
      {children}
    </div>
  );
};

interface NavDrawerPageProps {
  children: ReactNode;
}
const NavDrawerPage: FC<NavDrawerPageProps> = ({ children }) => {
  return (
    <DrawerContextProvider>
      <NavDrawer />
      <NavDrawerContent>{children}</NavDrawerContent>
    </DrawerContextProvider>
  );
};

export default NavDrawerPage;
