import clsx from "clsx";
import type { NextPage } from "next";
import Done from "./components/Done";
import VibeCheckForm from "./components/VibeCheck";
import useVibeCheckPage from "./hooks/useVibeCheckPage";

const VibeCheckPage: NextPage = () => {
  const { submitted, setSubmitted } = useVibeCheckPage();

  return (
    <div>
      <div
        className={clsx(
          "w-screen h-screen pt-[15vh] text-center transition-all duration-250",
          {
            "opacity-100": !submitted,
            "opacity-0 pointer-events-none": submitted,
          }
        )}
      >
        <VibeCheckForm setSubmitted={setSubmitted} />
      </div>
      <Done submitted={submitted} />
    </div>
  );
};

export default VibeCheckPage;
