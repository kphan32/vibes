import { ReactNode, FC } from "react";
import useDrawerContext from "../../hooks/useDrawerContext";
import clsx from "clsx";
import DrawerIcon, { IconComponentProps } from "./components/DrawerIcon";
import DrawerLabel from "./components/DrawerLabel";
import { useRouter } from "next/router";

interface DrawerItemProps {
  icon: FC<IconComponentProps>;
  label: string;
  path: string;
  onClick?: () => void;
}

const DrawerItem: FC<DrawerItemProps> = ({ icon, label, path, onClick }) => {
  const router = useRouter();
  const { open, closed } = useDrawerContext();
  const selected = router.asPath === path;

  return (
    <div
      className={clsx(
        "transition-all duration-300",
        {
          "opacity-0": closed,
        },
        "flex flex-row align-start items-center space-x-2",
        "rounded-lg p-2 select-none",
        "duration-300",
        {
          "bg-gradient-to-r from-cyan-400 to-blue-400 shadow-md": selected,
          "group hover:cursor-pointer hover:bg-gray-200": !selected,
        }
      )}
      onClick={onClick}
    >
      <DrawerIcon icon={icon} selected={selected} />
      <DrawerLabel label={label} selected={selected} />
    </div>
  );
};

export default DrawerItem;
