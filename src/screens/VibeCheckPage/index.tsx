import clsx from "clsx";
import type { NextPage } from "next";
import VibeCheckForm from "./components/VibeCheck";
import useVibeCheckPage from "./hooks/useVibeCheckPage";

const VibeCheckPage: NextPage = () => {
  const { submitted, setSubmitted } = useVibeCheckPage();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div
        className={clsx(
          "flex flex-col justify-center items-center space-y-8 px-4 text-center transition-all duration-500",
          { "opacity-0": submitted }
        )}
      >
        <p className="text-3xl font-bold drop-shadow-lg">Vibe Check</p>
        <VibeCheckForm setSubmitted={setSubmitted} />
      </div>
    </div>
  );
};

export default VibeCheckPage;
