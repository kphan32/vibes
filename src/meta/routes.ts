import { IconType } from "react-icons";
import { HiOutlineHome } from "react-icons/hi";
import { TiWavesOutline } from "react-icons/ti";

interface Route {
  name: string;
  path: string;
  icon: IconType;
}

const HOME = {
  name: "Home",
  path: "/",
  icon: HiOutlineHome,
};

const VIBE_CHECK = {
  name: "Vibe Check",
  path: "/vibe_check",
  icon: TiWavesOutline,
};

const ROUTES: Route[] = [HOME, VIBE_CHECK];

export default ROUTES;

export type { Route };
