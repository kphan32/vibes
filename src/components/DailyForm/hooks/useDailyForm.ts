import useLocalStorage from "../../../hooks/useLocalStorage";
import DailyEntry from "../../../types/dailyEntry";

const useDailyForm = () => {
  const [entries, setEntries] = useLocalStorage<DailyEntry[]>(
    "dailyEntries",
    []
  );

  const addEntry = (entry: DailyEntry) => setEntries([entry, ...entries]);

  return [addEntry];
};

export default useDailyForm;
