import VibeCheck from "../types/vibeCheck";
import useLocalStorage from "./useLocalStorage";

const useVibeChecks = () => {
  const [vibeChecks, setVibeChecks] = useLocalStorage<VibeCheck[]>(
    "vibeChecks",
    []
  );

  const addVibeCheck = (vibeCheck: VibeCheck) =>
    setVibeChecks([vibeCheck, ...vibeChecks]);

  const deleteVibeCheck = (vibeCheck: VibeCheck) => {
    const index = vibeChecks.indexOf(vibeCheck);
    if (index > -1) {
      vibeChecks.splice(index, 1);
    }

    setVibeChecks(vibeChecks);
  };

  return { vibeChecks, addVibeCheck, deleteVibeCheck };
};

export default useVibeChecks;
