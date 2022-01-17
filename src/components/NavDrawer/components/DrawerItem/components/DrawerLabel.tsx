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
        `grow-0 flex-none
         text-lg font-bold text-gray-300 
         group-hover:text-gray-500
         transition-all duration-200`,
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
