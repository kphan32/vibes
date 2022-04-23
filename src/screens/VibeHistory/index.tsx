import useVibeChecks from "@/hooks/useVibeChecks";
import VibeCheck from "@/types/vibeCheck";
import { emojiFor } from "@/utils/emoji";
import clsx from "clsx";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FC, useMemo, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import ViewVibeCheck from "./components/ViewVibeCheck";

interface VibeCheckEntryProps {
  key: number;
  openVibeCheck: (vibeCheck: VibeCheck) => void;
  vibeCheck: VibeCheck;
  deleted: VibeCheck[];
  setToDelete: (vibeCheck: VibeCheck) => void;
}

const VibeCheckEntry: FC<VibeCheckEntryProps> = ({
  key,
  openVibeCheck,
  vibeCheck,
  deleted,
  setToDelete,
}) => {
  const timestamp = new Date(vibeCheck.timestamp);

  return (
    <div
      className={clsx(
        `
        flex flex-row justify-between items-center
        w-72 m-4 p-3 rounded-md bg-gray-100 drop-shadow-md
        cursor-pointer
        hover:ring-2 hover:drop-shadow-lg
        transition-all duration-300
        `,
        { "opacity-0": deleted.includes(vibeCheck) }
      )}
      key={key}
      onClick={() => openVibeCheck(vibeCheck)}
    >
      <div className="flex flex-row space-x-2">
        <p className="h-12 text-4xl self-start">
          {emojiFor(vibeCheck.moodScore)}
        </p>
        <div>
          <p className={clsx(`text-sm text-gray-500`)}>
            {timestamp.toLocaleString("en-US", {
              timeStyle: "short",
              dateStyle: "short",
            })}
          </p>
          <p className="w-40 break-all truncate">{vibeCheck.description}</p>
        </div>
      </div>
      <div className="flex items-center">
        <HiOutlineTrash
          className={clsx(
            `w-6 h-6 cursor-pointer text-gray-400 hover:text-red-500 transition-colors`
          )}
          onClick={(e) => {
            setToDelete(vibeCheck);
            e.stopPropagation();
          }}
        />
      </div>
    </div>
  );
};

interface VibeChecksProps {
  vibeChecks: VibeCheck[];
  deleted: VibeCheck[];
  setToDelete: (vibeCheck: VibeCheck) => void;
  selectVibeCheck: (vibeCheck: VibeCheck) => void;
}

const VibeChecks: FC<VibeChecksProps> = ({
  vibeChecks,
  deleted,
  setToDelete,
  selectVibeCheck,
}) => {
  const router = useRouter();

  return (
    <div>
      <div
        className={clsx(`mt-8`, {
          "opacity-100 block": vibeChecks.length === 0,
          "opacity-0 hidden": vibeChecks.length > 0,
        })}
      >
        <p
          className="text-gray-400 hover:text-gray-600 transition-all cursor-pointer"
          onClick={() => router.push("/vibe_check")}
        >
          Click here to take a vibe check
        </p>
      </div>
      <div className="mt-8">
        {vibeChecks.map((vibeCheck, i) => (
          <VibeCheckEntry
            key={i}
            openVibeCheck={selectVibeCheck}
            vibeCheck={vibeCheck}
            deleted={deleted}
            setToDelete={setToDelete}
          />
        ))}
      </div>{" "}
    </div>
  );
};

const VibeHistory: NextPage = () => {
  const { vibeChecks, deleteVibeCheck } = useVibeChecks();
  const [deleted, setDeleted] = useState<VibeCheck[]>([]);

  const setToDelete = (vibeCheck: VibeCheck) => {
    setDeleted([vibeCheck, ...deleted]);
    setTimeout(() => deleteVibeCheck(vibeCheck), 150);
  };

  const [openVibeCheck, setOpenVibeCheck] = useState<VibeCheck | null>(null);

  return (
    <div
      className={clsx(
        `flex flex-col justify-start items-center
         w-screen h-screen
         pt-24`
      )}
    >
      <p className="text-5xl font-bold">Vibe History</p>
      <VibeChecks
        vibeChecks={vibeChecks}
        deleted={deleted}
        selectVibeCheck={setOpenVibeCheck}
        setToDelete={setToDelete}
      />
      <ViewVibeCheck
        vibeCheck={openVibeCheck}
        closeVibeCheck={() => setOpenVibeCheck(null)}
        setToDelete={setToDelete}
      />
    </div>
  );
};

export default VibeHistory;
