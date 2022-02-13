import clsx from "clsx";
import { FC, ReactNode, useEffect, useState } from "react";
import { HiOutlineTrash, HiX } from "react-icons/hi";
import VibeCheck from "../../../types/vibeCheck";
import { emojiFor } from "../../../utils/emoji";

interface CardProps {
  children: ReactNode;
}

const Card: FC<CardProps> = ({ children }) => {
  return (
    <div
      className={clsx(`
        flex-1
        m-10
        p-4
        ring-2
        rounded-lg
        bg-white
        drop-shadow-lg
      `)}
    >
      {children}
    </div>
  );
};

interface VibeCheckInfoProps {
  inVibeCheck: VibeCheck | null;
  close: () => void;
  setToDelete: (vibeCheck: VibeCheck) => void;
}

const VibeCheckInfo: FC<VibeCheckInfoProps> = ({
  inVibeCheck,
  close,
  setToDelete,
}) => {
  const [vibeCheck, setDebVibeCheck] = useState<VibeCheck | null>(null);

  useEffect(() => {
    if (inVibeCheck !== null) {
      setDebVibeCheck(inVibeCheck);
    }
  }, [inVibeCheck]);

  if (vibeCheck === null) {
    return <div />;
  }

  const timestamp = new Date(vibeCheck.timestamp);

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <p className="w-12 h-12 text-4xl self-start drop-shadow-md">
          {emojiFor(vibeCheck.moodScore)}
        </p>
        <div>
          <p className={clsx(`text-sm text-gray-500`)}>
            {timestamp.toLocaleString("en-US", {
              timeStyle: "short",
              dateStyle: "short",
            })}
            12
          </p>
        </div>
        <HiOutlineTrash
          className={clsx(
            `w-8 h-8 m-2 cursor-pointer text-gray-400 hover:text-red-500 drop-shadow-sm transition-colors`
          )}
          onClick={(e) => {
            setToDelete(vibeCheck);
            close();
            e.stopPropagation();
          }}
        />
      </div>
      <div className="flex-1 p-2">
        <textarea
          readOnly={true}
          className={`
            w-full h-full
            p-2
            rounded-md
            border-2
            bg-gray-50
            shadow-sm
            focus:outline-none
            resize-none
            cursor-default
          `}
          value={vibeCheck.description}
        ></textarea>
      </div>
      <div className="h-12 flex justify-center items-center">
        <HiX
          className="w-12 h-12 text-gray-400 hover:text-gray-600 drop-shadow-md transition-colors cursor-pointer"
          onClick={close}
        />
      </div>
    </div>
  );
};

interface ViewVibeCheckProps {
  vibeCheck: VibeCheck | null;
  closeVibeCheck: () => void;
  setToDelete: (vibeCheck: VibeCheck) => void;
}

const ViewVibeCheck: FC<ViewVibeCheckProps> = ({
  vibeCheck,
  closeVibeCheck,
  setToDelete,
}) => {
  return (
    <div
      className={clsx(
        `
        fixed top-0 left-0
        w-screen h-screen
        flex flex-col
        transition-all
        duration-700
      `,
        {
          "translate-y-[100vh]": vibeCheck === null,
        }
      )}
    >
      <div className="h-12 bg-transparent" onClick={closeVibeCheck} />
      <Card>
        <VibeCheckInfo
          inVibeCheck={vibeCheck}
          close={closeVibeCheck}
          setToDelete={setToDelete}
        />
      </Card>
    </div>
  );
};

export default ViewVibeCheck;
