import { ReactNode, useCallback, useEffect, useState } from "react";

const useTransitionPage = (children: ReactNode) => {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("fadeOut");

  useEffect(() => setTransitionStage("fadeIn"), []);

  useEffect(() => {
    if (children !== displayChildren) {
      setTransitionStage("fadeOut");
    }
  }, [children, setDisplayChildren, displayChildren]);

  const onTransitionEnd = useCallback(() => {
    if (transitionStage === "fadeOut") {
      setDisplayChildren(children);
      setTransitionStage("fadeIn");
    }
  }, [children, transitionStage]);

  return {
    transitionStage,
    onTransitionEnd,
    displayChildren,
  };
};

export default useTransitionPage;
