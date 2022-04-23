import React, { FC, useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { BiLoaderAlt } from "react-icons/bi";
import { HiOutlineTrash } from "react-icons/hi";
import { Button, Subtitle, Text } from "@/components/common";
import useReminderSettings from "@/hooks/useReminderSettings";

const periods = ["AM", "PM"];
const hourNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const hours = periods.flatMap((period) =>
  hourNumbers.map((hourNumber) => {
    let value = (hourNumber % 12) + (period === "PM" ? 12 : 0);

    // Conver to UTC hours
    const date = new Date();
    date.setHours(value);
    value = date.getUTCHours();

    return {
      text: `${hourNumber}${period}`,
      value,
    };
  })
);

const Reminders: FC = () => {
  const {
    loading,
    notificationPermissionStatus,
    enabled,
    hoursEnabled,
    setEnabled,
    addHour,
    removeHour,
  } = useReminderSettings();

  const notificationsPermitted = notificationPermissionStatus === "granted";

  const [selectedHour, setSelectedHour] = useState(0);

  useEffect(() => setSelectedHour(hours[0].value), []);

  return (
    <Screen>
      <EnableNotificationsText visible={!notificationsPermitted}>
        Enable notifications to use reminders
      </EnableNotificationsText>

      <Loading visible={notificationsPermitted && loading} />

      <SettingsContainer visible={!loading}>
        <Title>Reminders</Title>
        <PaddedSubtitle>
          Settings are stored remotely to support push notifications
        </PaddedSubtitle>

        <EnabledHeader>
          <EnabledLabel>Enabled</EnabledLabel>
          <Toggle
            onChange={(e) => setEnabled(e.target.checked)}
            checked={enabled}
          />
        </EnabledHeader>

        <Settings enabled={enabled}>
          <AddHour>
            <AddButton onClick={() => addHour(selectedHour)}>Add</AddButton>

            <HourSelect
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                e.preventDefault();
                setSelectedHour(Number.parseInt(e.target.value));
              }}
            >
              {hours.map((hour) => (
                <option key={hour.value} value={hour.value}>
                  {hour.text}
                </option>
              ))}
            </HourSelect>
          </AddHour>

          <HoursEnabled visible={hoursEnabled.length > 0}>
            {hoursEnabled.map((hourEnabled) => (
              <HourEnabled key={hourEnabled.utcHour}>
                <HourEnabledLabel>{hourEnabled.localizedHour}</HourEnabledLabel>

                <DeleteHourButton
                  onClick={() => removeHour(hourEnabled.utcHour)}
                />
              </HourEnabled>
            ))}
          </HoursEnabled>
        </Settings>
      </SettingsContainer>
    </Screen>
  );
};

const Screen = tw.div`
  w-screen
  h-screen

  flex
  flex-col
  justify-start
  items-center

  pt-20
`;

const EnableNotificationsText = tw(Subtitle)<VisibleProps>`
  text-lg

  transition-all
  ${({ visible }: VisibleProps) => (visible ? "opacity-100" : "opacity-0")}
`;

const Loading = tw(BiLoaderAlt)<VisibleProps>`
  fixed

  m-auto
  inset-0

  w-32
  h-32

  text-gray-200

  animate-spin

  transition-all
  ${(props: VisibleProps) => (props.visible ? "opacity-100" : "opacity-0")}
`;

const Title = tw(Text)`
  text-5xl
  font-bold

  pb-6
`;

const PaddedSubtitle = tw(Subtitle)`
  pb-8
`;

const EnabledLabel = tw(Text)`
  text-lg
  font-semibold
`;

const SettingsContainer = tw.div<VisibleProps>`
  w-64
  md:w-96

  flex
  flex-col
  justify-start
  items-center

  transition-all
  ${(props: VisibleProps) => (props.visible ? "opacity-100" : "opacity-0")}
`;

const Settings = tw.div`
  w-full

  ${(props: EnabledProps) =>
    props.enabled ? "opacity-100" : "opacity-50 pointer-events-none"}

  transition-all
`;

const EnabledHeader = tw.div`
  w-full

  flex
  place-content-between

  mb-2
`;

const AddHour = tw.div`
  w-full

  flex
  place-content-between
`;

const AddButton = tw(Button)`
  mr-4
  flex-1
`;

const HourSelect = tw.select`
  p-2

  border-2
  rounded-md
  border-gray-400

  background-white
`;

const HoursEnabled = tw.div<VisibleProps>`
  w-full

  mt-4

  flex
  flex-col
  divide-y

  border-2
  border-gray-400
  rounded-md

  ${(props: VisibleProps) => (props.visible ? "" : "invisible")}
`;

const HourEnabled = tw.div`
  w-full

  flex
  items-center
  place-content-between
`;

const HourEnabledLabel = tw(Text)`
  px-4
  py-4
`;

const DeleteHourButton = tw(HiOutlineTrash)`
  mr-4

  w-6
  h-full

  text-red-600
`;

interface EnabledProps {
  enabled: boolean;
}

interface VisibleProps {
  visible: boolean;
}

export default Reminders;
