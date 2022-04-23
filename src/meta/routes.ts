import { IconType } from "react-icons";
import { HiOutlineHome } from "react-icons/hi";
import { TiWavesOutline } from "react-icons/ti";
import { BiHistory, BiBell } from "react-icons/bi";

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

const REMINDERS = {
  name: "Reminders",
  path: "/reminders",
  icon: BiBell,
};

const ROUTES: Route[] = [HOME, VIBE_CHECK, VIBE_HISTORY, REMINDERS];

export default ROUTES;

export type { Route };
