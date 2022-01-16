import type { NextPage } from "next";
import VibeCheckForm from "../../components/VibeCheck";

const VibeCheckPage: NextPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center space-y-8 px-4 text-center">
      <p className="text-3xl font-bold drop-shadow-lg">Vibe Check</p>
      <VibeCheckForm />
    </div>
  );
};

export default VibeCheckPage;
