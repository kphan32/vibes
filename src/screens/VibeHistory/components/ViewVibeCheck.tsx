import { Text } from "@/components/common";
import VibeCheck from "@/types/vibeCheck";
import { emojiFor } from "@/utils/emoji";
import React, { FC, useEffect, useState } from "react";
import { HiOutlineTrash, HiX } from "react-icons/hi";
import tw from "tailwind-styled-components";

const ViewVibeCheck: FC<ViewVibeCheckProps> = ({
  vibeCheck,
  closeVibeCheck,
  setToDelete,
}) => {
  const visible = vibeCheck !== null;

  // Tracking the last vibe check opened prevents the card details from
  // disappearing when closing.
  const [lastVibeCheck, setLastVibeCheck] = useState<VibeCheck | null>(null);
  useEffect(() => {
    if (vibeCheck !== null) {
      setLastVibeCheck(vibeCheck);
    }
  }, [vibeCheck]);

  const timestampText = !!lastVibeCheck
    ? new Date(lastVibeCheck.timestamp).toLocaleString("en-US", {
        timeStyle: "short",
        dateStyle: "short",
      })
    : "";

  return (
    <SlideUp visible={visible}>
      <BackgroundArea onClick={closeVibeCheck} />
      <Card>
        <Header>
          <MoodIcon>{emojiFor(lastVibeCheck?.moodScore || 0)}</MoodIcon>

          <TimestampText>{timestampText}</TimestampText>

          <DeleteButton
            onClick={(e: React.ChangeEvent) => {
              if (!lastVibeCheck) return;

              setToDelete(lastVibeCheck);
              closeVibeCheck();
              e.stopPropagation();
            }}
          />
        </Header>

        <Body readOnly={true} value={lastVibeCheck?.description || ""} />

        <CloseButton onClick={closeVibeCheck} />
      </Card>
    </SlideUp>
  );
};

const SlideUp = tw.div<VisibleProps>`
  fixed top-0 left-0
  w-screen h-screen
  flex flex-col
  transition-all
  duration-700

  ${({ visible }: VisibleProps) => (visible ? "" : "translate-y-[100vh]")}
`;

const BackgroundArea = tw.div`
  absolute
  left-0
  top-0

  w-screen
  h-screen

  bg-transparent
`;

const Card = tw.div`
  flex-1

  m-10
  mt-24
  p-4

  flex
  flex-col

  ring-2

  rounded-lg

  bg-white

  drop-shadow-lg
`;

const Header = tw.div`
  flex
  flex-row
  justify-between
  items-center
`;

const MoodIcon = tw(Text)`
  w-12
  h-12

  text-4xl

  self-start

  drop-shadow-md
`;

const TimestampText = tw(Text)`
  text-sm
  text-gray-500
`;

const DeleteButton = tw(HiOutlineTrash)`
  w-8
  h-8

  m-2

  text-gray-400
  hover:text-red-500

  drop-shadow-sm

  transition-colors

  cursor-pointer
`;

const Body = tw.textarea`
  flex-1

  m-2
  p-2

  rounded-md
  border-2

  bg-gray-50

  shadow-sm

  focus:outline-none

  resize-none

  cursor-default
`;

const CloseButton = tw(HiX)`
  w-12
  h-12

  place-self-center

  text-gray-400
  hover:text-gray-600 

  drop-shadow-md

  active:translate-y-1
  active:drop-shadow-lg
  active:drop-shadow-gray-200/50

  transition-all

  cursor-pointer
`;

interface VisibleProps {
  visible: boolean;
}

interface ViewVibeCheckProps {
  vibeCheck: VibeCheck | null;
  closeVibeCheck: () => void;
  setToDelete: (vibeCheck: VibeCheck) => void;
}

export default ViewVibeCheck;
