import { HiMenu } from "react-icons/hi";
import useDrawerContext from "../hooks/useDrawerContext";
import clsx from "clsx";

const DrawerButton = () => {
  const { open, closed, toggleOpen } = useDrawerContext();

  return (
    <div
      className={clsx(
        "transition-all duration-300",
        {
          "w-12 h-12": closed,
          "w-30 h-12": open,
        },
        "flex flex-row place-content-between items-center"
      )}
    >
      <div className="relative w-0">
        <p
          className={clsx(
            "p-2",
            "transition-all",
            "text-gray-700 text-3xl font-bold",
            "pointer-events-none",
            {
              "opacity-0 duration-100": closed,
              "visible duration-100 delay-100": open,
            }
          )}
        >
          Vibes
        </p>
      </div>

      <HiMenu
        className={clsx(
          "w-12 h-12 hover:cursor-pointer p-2 rounded-lg",
          "transition-all duration-300",
          "text-gray-300 hover:text-gray-400"
        )}
        onClick={toggleOpen}
      />
    </div>
  );
};

export default DrawerButton;
