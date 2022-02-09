import clsx from "clsx";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import useVibeChecks from "../../hooks/useVibeChecks";
import VibeCheck from "../../types/vibeCheck";

interface VibeCheckEntryProps {
  key: number;
  vibeCheck: VibeCheck;
  deleted: VibeCheck[];
  setToDelete: (vibeCheck: VibeCheck) => void;
}

const VibeCheckEntry: FC<VibeCheckEntryProps> = ({
  key,
  vibeCheck,
  deleted,
  setToDelete,
}) => {
  const timestamp = new Date(vibeCheck.timestamp);

  return (
    <div
      className={clsx(
        `flex flex-row justify-between
               w-72 m-4 p-3 rounded-md bg-gray-100 drop-shadow-md
               transition-opacity duration-150`,
        { "opacity-0": deleted.includes(vibeCheck) }
      )}
      key={key}
    >
      <div>
        <p className={clsx(`text-sm text-gray-500`)}>
          {timestamp.toLocaleString("en-US", {
            timeStyle: "short",
            dateStyle: "short",
          })}
        </p>
        <p>{vibeCheck.description}</p>
      </div>
      <div className="flex items-center">
        <HiOutlineTrash
          className={clsx(
            `w-6 h-6 cursor-pointer text-gray-400 hover:text-red-500 transition-colors`
          )}
          onClick={() => setToDelete(vibeCheck)}
        />
      </div>
    </div>
  );
};

const VibeChecks = () => {
  const router = useRouter();
  const { vibeChecks, deleteVibeCheck } = useVibeChecks();
  const [deleted, setDeleted] = useState<VibeCheck[]>([]);

  const setToDelete = (vibeCheck: VibeCheck) => {
    setDeleted([vibeCheck, ...deleted]);
    setTimeout(() => deleteVibeCheck(vibeCheck), 150);
  };

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
  return (
    <div
      className={clsx(
        `flex flex-col justify-start items-center
         w-screen h-screen
         pt-24`
      )}
    >
      <p className="text-5xl font-bold">Vibe History</p>
      <VibeChecks />
    </div>
  );
};

export default VibeHistory;
