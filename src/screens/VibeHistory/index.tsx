import clsx from "clsx";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { HiOutlineTrash } from "react-icons/hi";
import useVibeChecks from "../../hooks/useVibeChecks";

const VibeChecks = () => {
  const router = useRouter();
  const { vibeChecks, deleteVibeCheck } = useVibeChecks();

  if (vibeChecks.length === 0) {
    return (
      <div className="mt-8">
        <p
          className="text-gray-400 hover:text-gray-600 transition-all cursor-pointer"
          onClick={() => router.push("/vibe_check")}
        >
          Click here to take a vibe check
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      {vibeChecks.map((vibeCheck, i) => {
        const timestamp = new Date(vibeCheck.timestamp);

        return (
          <div
            className={clsx(
              `flex flex-row justify-between
               w-72 m-4 p-2 rounded-md bg-gray-100 drop-shadow-md`
            )}
            key={i}
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
                  `w-6 h-6 mr-2 cursor-pointer text-gray-400 hover:text-red-500 transition-colors`
                )}
                onClick={() => {
                  deleteVibeCheck(vibeCheck);
                }}
              />
            </div>
          </div>
        );
      })}
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
