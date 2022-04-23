import VibeCheck from "@/types/vibeCheck";
import { useCallback } from "react";
import useLocalStorage from "./useLocalStorage";

const useVibeChecks = () => {
  const [vibeChecks, setVibeChecks] = useLocalStorage<VibeCheck[]>(
    "vibeChecks",
    []
  );

  const addVibeCheck = useCallback(
    (vibeCheck: VibeCheck) => setVibeChecks([vibeCheck, ...vibeChecks]),
    [setVibeChecks, vibeChecks]
  );

  const deleteVibeCheck = useCallback(
    (vibeCheck: VibeCheck) => {
      const index = vibeChecks.indexOf(vibeCheck);
      if (index > -1) {
        vibeChecks.splice(index, 1);
      }

      setVibeChecks(vibeChecks);
    },
    [setVibeChecks, vibeChecks]
  );

  return { vibeChecks, addVibeCheck, deleteVibeCheck };
};

export default useVibeChecks;
