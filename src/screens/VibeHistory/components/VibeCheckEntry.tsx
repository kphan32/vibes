import { Text } from "@/components/common";
import VibeCheck from "@/types/vibeCheck";
import { emojiFor } from "@/utils/emoji";
import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import tw from "tailwind-styled-components";

const VibeCheckEntry = ({
  key,
  openVibeCheck,
  vibeCheck,
  deleted,
  setToDelete,
}: VibeCheckEntryProps) => {
  const timestamp = new Date(vibeCheck.timestamp);

  const visible = !deleted.includes(vibeCheck);

  const dateText = timestamp.toLocaleString("en-US", {
    timeStyle: "short",
    dateStyle: "short",
  });

  const handleDeleteButtonClick = (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setToDelete(vibeCheck);
    e.stopPropagation();
  };

  return (
    <Container
      key={key}
      onClick={() => openVibeCheck(vibeCheck)}
      visible={visible}
    >
      <Details>
        <MoodIcon>{emojiFor(vibeCheck.moodScore)}</MoodIcon>

        <TextDetails>
          <DateText>{dateText}</DateText>
          <BodyText>{vibeCheck.description}</BodyText>
        </TextDetails>
      </Details>

      <DeleteButton onClick={handleDeleteButtonClick}>
        <DeleteIcon />
      </DeleteButton>
    </Container>
  );
};

const Container = tw.div<VisibleProps>`
  m-4
  p-3

  w-72

  flex
  flex-row
  justify-between
  items-center

  rounded-md
  bg-gray-100
  drop-shadow-md

  cursor-pointer

  hover:ring-2
  hover:drop-shadow-lg

  transition-all
  duration-300

  ${({ visible }: VisibleProps) => (visible ? "opacity-100" : "opacity-0")}
`;

const Details = tw.div`
  flex
  flex-row
  space-x-2
`;

const MoodIcon = tw(Text)`
  h-12

  text-4xl

  self-start
`;

const TextDetails = tw.div``;

const DateText = tw(Text)`
  text-sm
  text-gray-500
`;

const BodyText = tw(Text)`
  w-40

  break-all
  truncate
`;

const DeleteButton = tw.div`
  flex
  items-center
`;

const DeleteIcon = tw(HiOutlineTrash)`
  w-6
  h-6

  text-gray-400
  hover:text-red-500

  transition-colors

  cursor-pointer
`;

interface VisibleProps {
  visible: boolean;
}

interface VibeCheckEntryProps {
  key: number;
  openVibeCheck: (vibeCheck: VibeCheck) => void;
  vibeCheck: VibeCheck;
  deleted: VibeCheck[];
  setToDelete: (vibeCheck: VibeCheck) => void;
}

export default VibeCheckEntry;
