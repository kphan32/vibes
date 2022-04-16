import { IconType } from "react-icons";
import { HiOutlineHome } from "react-icons/hi";
import { TiWavesOutline } from "react-icons/ti";
import { BiHistory } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";

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

const VIBE_HISTORY = {
  name: "Vibe History",
  path: "/vibe_history",
  icon: BiHistory,
};

const SETTINGS = {
  name: "Settings",
  path: "/settings",
  icon: FiSettings,
};

const ROUTES: Route[] = [HOME, VIBE_CHECK, VIBE_HISTORY, SETTINGS];

export default ROUTES;

export type { Route };
