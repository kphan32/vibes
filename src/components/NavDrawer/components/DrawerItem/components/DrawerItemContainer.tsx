import clsx from "clsx";
import { FC, ReactNode } from "react";

interface DrawerItemContainerProps {
  closed: boolean;
  selected: boolean;
  onClick?: () => void;
  children: ReactNode;
}

const DrawerItemContainer: FC<DrawerItemContainerProps> = ({
  closed,
  selected,
  onClick,
  children,
}) => {
  return (
    <div
      className={clsx(
        `
      flex flex-row align-start items-center
      space-x-2
      p-2
      rounded-lg
      transition-all duration-150
      select-none
      `,
        {
          "opacity-0": closed,
          "bg-gradient-to-r from-cyan-400 to-blue-400 shadow-md": selected,
          "group hover:cursor-pointer hover:bg-gray-200": !selected,
        }
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default DrawerItemContainer;
