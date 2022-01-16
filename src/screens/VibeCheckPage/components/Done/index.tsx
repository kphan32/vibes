import clsx from "clsx";
import { FC } from "react";
import { HiOutlineCheckCircle } from "react-icons/hi";

interface DoneProps {
  submitted: boolean;
}

const Done: FC<DoneProps> = ({ submitted }) => {
  return (
    <div
      className={clsx(
        "w-screen h-screen absolute left-0 top-0 flex flex-col justify-center items-center space-y-4 pointer-events-none transition-all duration-250",
        { "opacity-0": !submitted, "opacity-100": submitted }
      )}
    >
      <p className="text-4xl font-semibold drop-shadow-md">Done</p>
      <HiOutlineCheckCircle className="w-24 h-24 text-green-500 drop-shadow-md" />
    </div>
  );
};

export default Done;
