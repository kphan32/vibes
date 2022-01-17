import { FC } from "react";
import clsx from "clsx";

interface IconComponentProps {
  className: string;
}

interface DrawerIconProps {
  icon: FC<IconComponentProps>;
  selected: boolean;
}

const DrawerIcon: FC<DrawerIconProps> = ({ icon, selected }) => {
  return icon({
    className: clsx(
      "flex-none w-8 h-8",
      "text-gray-300",
      "transition-color duration-200",
      "group-hover:text-gray-500",
      {
        "text-gray-100": selected,
      }
    ),
  });
};

export default DrawerIcon;
export type { IconComponentProps };
