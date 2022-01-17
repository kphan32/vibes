import clsx from "clsx";
import DrawerButton from "./components/DrawerButton";
import useDrawerContext from "./hooks/useDrawerContext";
import DrawerItem from "./components/DrawerItem";
import ROUTES from "../../meta/routes";
import { useRouter } from "next/router";

const Divider = () => {
  return (
    <div className="px-2 pb-4">
      <div className="bg-gray-200 w-full h-0.5" />
    </div>
  );
};

const DrawerItems = () => {
  const { toggleOpen } = useDrawerContext();
  const router = useRouter();

  return (
    <div className="overflow-x-hidden overflow-y-scroll  space-y-2">
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
  const { open, closed } = useDrawerContext();

  return (
    <div
      className={clsx(
        `flex flex-col
         h-full
         absolute top-0 left-0 z-10
         p-2 pb-10 lg:pb-12
         bg-white shadow-2xl
         transition-all duration-300`,
        {
          "w-0": closed,
          "w-72": open,
        }
      )}
    >
      <DrawerButton />
      <Divider />
      <DrawerItems />
    </div>
  );
};

export default NavDrawer;
