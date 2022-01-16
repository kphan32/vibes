import clsx from "clsx";
import { FC, useEffect, useState } from "react";

interface TransitionProps {
  children: React.ReactNode;
}

const Transition: FC<TransitionProps> = ({ children }) => {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("fadeOut");

  useEffect(() => setTransitionStage("fadeIn"), []);

  useEffect(() => {
    if (children !== displayChildren) {
      setTransitionStage("fadeOut");
    }
  }, [children, setDisplayChildren, displayChildren]);

  const onTransitionEnd = () => {
    if (transitionStage === "fadeOut") {
      setDisplayChildren(children);
      setTransitionStage("fadeIn");
    }
  };

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

export default Transition;
