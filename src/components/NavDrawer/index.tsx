import clsx from "clsx";
import DrawerButton from "./components/DrawerButton";
import useNavDrawerContext from "./hooks/useNavDrawerContext";
import DrawerItem from "./components/DrawerItem";
import ROUTES from "../../meta/routes";
import { useRouter } from "next/router";
import { FC } from "react";
import useCloseOnBack from "./hooks/useCloseOnBack";

const NavDrawerContainer: FC = ({ children }) => {
  const { open, closed } = useNavDrawerContext();

  return (
    <div
      className={clsx(
        `
        h-full
        fixed top-0 left-0 z-10
        p-2 pb-10 lg:pb-12
        flex flex-col
        bg-white
        shadow-2xl
        transition-all duration-300
        `,
        {
          "w-16 shadow-none bg-transparent": closed,
          "w-screen sm:w-64": open,
        }
      )}
    >
      {children}
    </div>
  );
};

const Divider = () => {
  const { closed } = useNavDrawerContext();
  return (
    <div className={clsx("px-2 pb-4", { "opacity-0": closed })}>
      <div className="w-full h-0.5 bg-gray-200" />
    </div>
  );
};

const NavDrawerItems = () => {
  const { closed } = useNavDrawerContext();
  const router = useRouter();

  return (
    <div
      className={clsx("space-y-2 overflow-x-hidden", {
        "pointer-events-none": closed,
      })}
    >
      {ROUTES.map((route, i) => {
        return (
          <DrawerItem
            key={i}
            icon={route.icon}
            label={route.name}
            selected={router.asPath === route.path}
            onClick={() => {
              router.push(route.path);
            }}
          />
        );
      })}
    </div>
  );
};

const NavDrawer = () => {
  useCloseOnBack();

  return (
    <NavDrawerContainer>
      <DrawerButton />
      <Divider />
      <NavDrawerItems />
    </NavDrawerContainer>
  );
};

export default NavDrawer;
