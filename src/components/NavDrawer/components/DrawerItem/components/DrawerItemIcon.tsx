import { FC } from "react";
import clsx from "clsx";

interface IconComponentProps {
  className: string;
}

interface DrawerItemIconProps {
  icon: FC<IconComponentProps>;
  selected: boolean;
}

const DrawerItemIcon: FC<DrawerItemIconProps> = ({ icon, selected }) => {
  return icon({
    className: clsx(
      `
      w-8 h-8
      flex-none
      text-gray-300 group-hover:text-gray-500
      transition-color duration-150
      `,
      {
        "text-gray-100": selected,
      }
    ),
  });
};

export default DrawerItemIcon;
export type { IconComponentProps };
