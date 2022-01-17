import clsx from "clsx";
import DrawerButton from "./components/DrawerButton";
import useDrawerContext from "./hooks/useDrawerContext";
import { HiAdjustments } from "react-icons/hi";
import DrawerItem from "./components/DrawerItem";

const Divider = () => {
  return (
    <div className="px-2 pb-4">
      <div className="bg-gray-200 w-full h-0.5" />
    </div>
  );
};

const DrawerItems = () => {
  return (
    <div className="overflow-scroll scrollbar-hide space-y-2">
      {Array.from(Array(4)).map((_, i) => {
        return (
          <DrawerItem key={1} icon={HiAdjustments} label={`Item ${i + 1}`} />
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
        "flex flex-col",
        "absolute top-0 left-0 z-10",
        "p-2 pb-10 lg:pb-12",
        "h-full",
        "transition-all duration-300",
        "bg-white shadow-2xl",
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
