import VibeCheck from "@/types/vibeCheck";
import tw from "tailwind-styled-components";
import VibeCheckEntry from "./VibeCheckEntry";

const VibeChecks = ({
  vibeChecks,
  deleted,
  setToDelete,
  selectVibeCheck,
}: VibeChecksProps) => {
  return (
    <Container>
      {vibeChecks.map((vibeCheck, i) => (
        <VibeCheckEntry
          key={i}
          openVibeCheck={selectVibeCheck}
          vibeCheck={vibeCheck}
          deleted={deleted}
          setToDelete={setToDelete}
        />
      ))}
    </Container>
  );
};

const Container = tw.div`
  mt-8
`;

interface VibeChecksProps {
  vibeChecks: VibeCheck[];
  deleted: VibeCheck[];
  setToDelete: (vibeCheck: VibeCheck) => void;
  selectVibeCheck: (vibeCheck: VibeCheck) => void;
}

export default VibeChecks;
