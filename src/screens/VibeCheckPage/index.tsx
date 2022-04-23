import type { NextPage } from "next";
import Done from "./components/Done";
import VibeCheckForm from "./components/VibeCheckForm";
import useVibeCheckPage from "./hooks/useVibeCheckPage";

const VibeCheckPage: NextPage = () => {
  const { submitted, setSubmitted } = useVibeCheckPage();

  return (
    <div>
      <VibeCheckForm submitted={submitted} setSubmitted={setSubmitted} />
      <Done submitted={submitted} />
    </div>
  );
};

export default VibeCheckPage;
