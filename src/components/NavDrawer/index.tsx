import clsx from "clsx";
import DrawerButton from "./components/DrawerButton";
import useDrawerContext from "./hooks/useDrawerContext";
import DrawerItem from "./components/DrawerItem";
import ROUTES from "../../meta/routes";
import { useRouter } from "next/router";
import { FC } from "react";

const Container: FC = ({ children }) => {
  const { open, closed } = useDrawerContext();

  return (
    <div
      className={clsx(
        `
        h-full
        absolute top-0 left-0 z-10
        p-2 pb-10 lg:pb-12
        flex flex-col
        bg-white
        shadow-2xl
        transition-all duration-300
        `,
        {
          "w-0": closed,
          "w-screen sm:w-64": open,
        }
      )}
    >
      {children}
    </div>
  );
};

const Divider = () => {
  return (
    <div className="px-2 pb-4">
      <div className="w-full h-0.5 bg-gray-200" />
    </div>
  );
};

const DrawerItems = () => {
  const { toggleOpen } = useDrawerContext();
  const router = useRouter();

  return (
    <div className="space-y-2 overflow-x-hidden overflow-y-scroll">
      {ROUTES.map((route, i) => {
        return (
          <DrawerItem
            key={i}
            icon={route.icon}
            label={route.name}
            path={route.path}
            onClick={() => {
              router.push(route.path);
              toggleOpen();
            }}
          />
        );
      })}
    </div>
  );
};

const NavDrawer = () => {
  return (
    <Container>
      <DrawerButton />
      <Divider />
      <DrawerItems />
    </Container>
  );
};

export default NavDrawer;
