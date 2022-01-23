import { FC } from "react";
import DrawerItemIcon, {
  IconComponentProps,
} from "./components/DrawerItemIcon";
import DrawerItemLabel from "./components/DrawerItemLabel";
import DrawerItemContainer from "./components/DrawerItemContainer";
import useNavDrawerContext from "../../hooks/useNavDrawerContext";

interface DrawerItemProps {
  icon: FC<IconComponentProps>;
  label: string;
  selected: boolean;
  onClick?: () => void;
}

const DrawerItem: FC<DrawerItemProps> = ({
  icon,
  label,
  selected,
  onClick,
}) => {
  const { closed } = useNavDrawerContext();

  return (
    <DrawerItemContainer closed={closed} selected={selected} onClick={onClick}>
      <DrawerItemIcon icon={icon} selected={selected} />
      <DrawerItemLabel label={label} selected={selected} />
    </DrawerItemContainer>
  );
};

export default DrawerItem;
