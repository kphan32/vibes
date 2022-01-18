import useLocalStorage from "../../../../../hooks/useLocalStorage";
import VibeCheck from "../../../../../types/vibeCheck";

const useVibeCheckForm = () => {
  const [entries, setEntries] = useLocalStorage<VibeCheck[]>(
    "vibeCheckEntries",
    []
  );

  const addEntry = (entry: VibeCheck) => setEntries([entry, ...entries]);

  return [addEntry];
};

export default useVibeCheckForm;
