import { HiMenu } from "react-icons/hi";
import useNavDrawerContext from "../hooks/useNavDrawerContext";
import clsx from "clsx";

const DrawerButton = () => {
  const { open, closed, toggleOpen } = useNavDrawerContext();

  return (
    <div
      className={clsx(
        `
        flex flex-row place-content-between items-center
        transition-all
        pointer-events-auto
        `
      )}
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
              "opacity-0 duration-100": closed,
              "opacity-100 duration-250 delay-100": open,
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
