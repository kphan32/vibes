import { FC } from "react";
import clsx from "clsx";
import useDrawerContext from "../../../hooks/useDrawerContext";

interface DrawerLabelProps {
  label: string;
  selected: boolean;
}

const DrawerLabel: FC<DrawerLabelProps> = ({ label, selected }) => {
  const { open, closed } = useDrawerContext();

  return (
    <p
      className={clsx(
        // `flex-none` prevents the text from squishing the icons onto
        // another row during the closing transition.
        `
        flex-none grow-0
        text-lg font-bold
        text-gray-300 group-hover:text-gray-500
        transition-color duration-150`,
        {
          "opacity-0 invisible": closed,
          "opacity-100": open,
          "text-gray-100": selected,
        }
      )}
    >
      {label}
    </p>
  );
};

export default DrawerLabel;
