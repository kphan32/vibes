import { FC } from "react";
import tw from "tailwind-styled-components";
import useReminderSettings from "../../hooks/useReminderSettings";

import Toggle from "react-toggle";
import "react-toggle/style.css";

const Settings: FC = () => {
  const { enabled, setEnabled } = useReminderSettings();

  return (
    <Container>
      <Title>Settings</Title>
      <SettingsContainer>
        <RemindersContainer>
          <RemindersHeaderContainer>
            <SettingLabel>Reminders</SettingLabel>
            <Toggle
              onChange={(e) => setEnabled(e.target.checked)}
              checked={enabled}
            />
          </RemindersHeaderContainer>
        </RemindersContainer>
      </SettingsContainer>
    </Container>
  );
};

const Container = tw.div`
  w-screen
  h-screen

  flex
  flex-col
  justify-start
  items-center

  pt-20
`;

const Title = tw.p`
  text-5xl
  font-bold

  pb-6
`;

const SettingLabel = tw.p`
  text-lg
  font-semibold
`;

const SettingsContainer = tw.div`
  w-64
  md:w-96

  flex
  flex-col
  justify-start
  items-center
`;

const RemindersContainer = tw.div`
  w-full
`;

const RemindersHeaderContainer = tw.div`
  w-full
  flex
  place-content-between

  px-2
  mb-2
`;

export default Settings;
