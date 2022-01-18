import { HiMenu } from "react-icons/hi";
import useDrawerContext from "../hooks/useDrawerContext";
import clsx from "clsx";

const DrawerButton = () => {
  const { open, closed, toggleOpen } = useDrawerContext();

  return (
    <div
      className={clsx("flex flex-row place-content-between items-center", {
        "w-12 h-12": closed,
        "w-30 h-12": open,
      })}
    >
      <div className="relative w-0">
        <p
          className={clsx(
            `
            p-2
            text-3xl font-bold
            text-gray-700
            transition-all
            pointer-events-none
            `,
            {
              "opacity-0 duration-250": closed,
              "opacity-100 duration-100 delay-250": open,
            }
          )}
        >
          Vibes
        </p>
      </div>

      <HiMenu
        className={clsx(
          `
          w-12 h-12 p-2
          text-gray-300 hover:text-gray-400
          transition-colors duration-150
          cursor-pointer
          `
        )}
        onClick={toggleOpen}
      />
    </div>
  );
};

export default DrawerButton;
