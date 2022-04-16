import { useCallback, useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";

const useReminderSettings = () => {
  const [reminderSettings, setReminderSettings] =
    useLocalStorage<ReminderSettings>("reminderSettings", {
      enabled: false,
      timesEnabled: [],
    });

  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [timesEnabled, setTimesEnabled] = useState<String[]>([]);

  // Sync local storage with state
  useEffect(() => {
    setRemindersEnabled(reminderSettings.enabled);
    setTimesEnabled(reminderSettings.timesEnabled);
  }, [reminderSettings, timesEnabled]);

  // Because the local storage hook is not triggering renders correctly,
  // it's values need to be broken down into other hooks. This means that
  // getters will access the other hooks while setters will use the local
  // storage hook.

  // Getter to check if a time is enabled
  const timeEnabled = useCallback(
    (time: String) => timesEnabled.includes(time),
    [timesEnabled]
  );

  const setEnabled = useCallback(
    (enabled: boolean) => {
      reminderSettings.enabled = enabled;
      setReminderSettings({ ...reminderSettings });
    },
    [reminderSettings, setReminderSettings]
  );

  const toggleTimeEnabled = useCallback(
    (time: String) => {
      const indexFound = reminderSettings.timesEnabled.indexOf(time);
      if (indexFound > -1) {
        reminderSettings.timesEnabled.splice(indexFound, 1);
        setReminderSettings({ ...reminderSettings });
      } else {
        reminderSettings.timesEnabled.push(time);
        setReminderSettings({ ...reminderSettings });
      }
    },
    [reminderSettings, setReminderSettings]
  );

  return {
    enabled: remindersEnabled,
    timeEnabled,
    setEnabled,
    toggleTimeEnabled,
  };
};

interface ReminderSettings {
  enabled: boolean;
  timesEnabled: String[];
}

export default useReminderSettings;
