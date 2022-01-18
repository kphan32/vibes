import clsx from "clsx";
import type { NextPage } from "next";
import Done from "./components/Done";
import VibeCheckForm from "./components/VibeCheck";
import useVibeCheckPage from "./hooks/useVibeCheckPage";

const VibeCheckPage: NextPage = () => {
  const { submitted, setSubmitted } = useVibeCheckPage();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div
        className={clsx(
          "flex flex-col justify-center items-center space-y-8 px-4 text-center transition-all duration-250",
          {
            "opacity-100": !submitted,
            "opacity-0 pointer-events-none": submitted,
          }
        )}
      >
        <p className="text-5xl font-bold">Vibe Check</p>
        <VibeCheckForm setSubmitted={setSubmitted} />
      </div>
      <Done submitted={submitted} />
    </div>
  );
};

export default VibeCheckPage;
