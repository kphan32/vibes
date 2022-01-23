/**
 * Adapted from this guide:
 *  https://dev.to/anxinyang/page-transition-effect-in-nextjs-9ch
 */

import clsx from "clsx";
import { FC } from "react";
import useTransitionPage from "./hooks/useTransitionPage";

interface TransitionPageProps {
  children: React.ReactNode;
}

const TransitionPage: FC<TransitionPageProps> = ({ children }) => {
  const { transitionStage, onTransitionEnd, displayChildren } =
    useTransitionPage(children);

  return (
    <div
      className={clsx("transition-all duration-250", {
        "opacity-0": transitionStage === "fadeOut",
        "opacity-100": transitionStage === "fadeIn",
      })}
      onTransitionEnd={onTransitionEnd}
    >
      {displayChildren}
    </div>
  );
};

export default TransitionPage;
