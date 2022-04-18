import { useCallback, useState } from "react";

const useReminderSettings = () => {
  const [enabled, setEnabled] = useState(false);

  return {
    enabled,
    setEnabled,
  };
};

export default useReminderSettings;
