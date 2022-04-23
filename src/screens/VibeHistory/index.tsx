import { Text } from "@/components/common";
import useVibeChecks from "@/hooks/useVibeChecks";
import VibeCheck from "@/types/vibeCheck";
import type { NextPage } from "next";
import { useState } from "react";
import tw from "tailwind-styled-components";
import TakeVibeCheck from "./components/TakeVibeCheck";
import VibeChecks from "./components/VibeChecks";
import ViewVibeCheck from "./components/ViewVibeCheck";

const VibeHistory: NextPage = () => {
  const { vibeChecks, deleteVibeCheck } = useVibeChecks();
  const [deleted, setDeleted] = useState<VibeCheck[]>([]);

  const setToDelete = (vibeCheck: VibeCheck) => {
    setDeleted([vibeCheck, ...deleted]);
    setTimeout(() => deleteVibeCheck(vibeCheck), 150);
  };

  const [openVibeCheck, setOpenVibeCheck] = useState<VibeCheck | null>(null);

  const showViewVibeCheck = vibeChecks.length === 0;

  return (
    <Screen>
      <Title>Vibe History</Title>

      <VibeChecks
        vibeChecks={vibeChecks}
        deleted={deleted}
        selectVibeCheck={setOpenVibeCheck}
        setToDelete={setToDelete}
      />

      <TakeVibeCheck visible={showViewVibeCheck} />

      <ViewVibeCheck
        vibeCheck={openVibeCheck}
        closeVibeCheck={() => setOpenVibeCheck(null)}
        setToDelete={setToDelete}
      />
    </Screen>
  );
};

const Screen = tw.div`
  w-screen
  h-screen

  pt-24

  flex
  flex-col
  justify-start
  items-center
`;

const Title = tw(Text)`
  text-5xl
  font-bold
`;

export default VibeHistory;
