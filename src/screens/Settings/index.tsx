import { FC } from "react";
import tw from "tailwind-styled-components";
import useReminderSettings from "../../hooks/useReminderSettings";

import Toggle from "react-toggle";
import "react-toggle/style.css";

const times = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const Settings: FC = () => {
  const { enabled, setEnabled, toggleTimeEnabled, timeEnabled } =
    useReminderSettings();

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

          <ReminderTimesContainer disabled={!enabled}>
            <ReminderTimesAMContainer>
              {times.map((i) => (
                <ReminderAMTimeOption
                  key={i}
                  onClick={() => toggleTimeEnabled(`${i}AM`)}
                  disabled={!timeEnabled(`${i}AM`)}
                >
                  {i}AM
                </ReminderAMTimeOption>
              ))}
            </ReminderTimesAMContainer>
            <ReminderTimesPMContainer>
              {times.map((i) => (
                <ReminderPMTimeOption
                  key={i}
                  onClick={() => toggleTimeEnabled(`${i}PM`)}
                  disabled={!timeEnabled(`${i}PM`)}
                >
                  {i}PM
                </ReminderPMTimeOption>
              ))}
            </ReminderTimesPMContainer>
          </ReminderTimesContainer>
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

const ReminderTimesContainer = tw.div`
  ${({ disabled }: DisableProp) =>
    disabled ? "opacity-50 pointer-events-none" : "opacity-100"}

  w-full

  flex

  transition-all

  divide-x-2
  divide-gray-500

  border-2
  rounded-lg
  border-gray-500
`;

const ReminderTimesAMContainer = tw.div`
  flex-1

  divide-y-2
  divide-gray-500
`;

const ReminderTimesPMContainer = tw.div`
  flex-1

  divide-y-2
  divide-gray-500
`;

const ReminderTimeOption = tw.p`
  ${({ disabled }: DisableProp) => (disabled ? "" : "bg-gray-300")}

  py-3

  text-center
  text-gray-600

  transition-all
`;

const ReminderAMTimeOption = tw(ReminderTimeOption)`
  first:rounded-tl-lg
  last:rounded-bl-lg
`;

const ReminderPMTimeOption = tw(ReminderTimeOption)`
  first:rounded-tr-lg
  last:rounded-br-lg
`;

interface DisableProp {
  disabled: boolean;
}

export default Settings;
