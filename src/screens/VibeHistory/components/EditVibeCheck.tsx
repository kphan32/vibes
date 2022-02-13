import clsx from "clsx";
import { FC, ReactNode } from "react";
import VibeCheck from "../../../types/vibeCheck";

interface CardProps {
  children: ReactNode;
}

const Card: FC<CardProps> = ({ children }) => {
  return (
    <div
      className={clsx(`
        flex-1
        m-4
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

interface EditVibeCheckProps {
  vibeCheck: VibeCheck | null;
  closeVibeCheck: () => void;
}

const EditVibeCheck: FC<EditVibeCheckProps> = ({
  vibeCheck,
  closeVibeCheck,
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
        <p>hello</p>
      </Card>
    </div>
  );
};

export default EditVibeCheck;
