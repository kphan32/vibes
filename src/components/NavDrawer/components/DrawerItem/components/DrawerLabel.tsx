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
        "flex-none transition-all",
        "text-gray-300 text-lg font-bold",
        "group-hover:text-gray-500",
        "duration-200",
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
