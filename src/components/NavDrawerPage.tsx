import { FC, ReactNode } from "react";
import NavDrawer from "./NavDrawer";
import DrawerContextProvider from "./NavDrawer/components/DrawerContextProvider";

interface NavDrawerPageProps {
  children: ReactNode;
}

const NavDrawerPage: FC<NavDrawerPageProps> = ({ children }) => {
  return (
    <DrawerContextProvider>
      <NavDrawer />
      <div className="flex flex-1">{children}</div>
    </DrawerContextProvider>
  );
};

export default NavDrawerPage;
