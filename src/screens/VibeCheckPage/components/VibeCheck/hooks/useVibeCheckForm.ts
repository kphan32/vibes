import useLocalStorage from "../../../../../hooks/useLocalStorage";
import VibeCheckEntry from "../../../../../types/vibeCheckEntry";

const useVibeCheckForm = () => {
  const [entries, setEntries] = useLocalStorage<VibeCheckEntry[]>(
    "vibeCheckEntries",
    []
  );

  const addEntry = (entry: VibeCheckEntry) => setEntries([entry, ...entries]);

  return [addEntry];
};

export default useVibeCheckForm;
