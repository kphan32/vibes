import type { NextPage } from "next";
import useHome from "./hooks/useHome";

const Home: NextPage = () => {
  const { gotoVibeCheck } = useHome();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center space-y-8 px-4 text-center">
      <div className="w-64">
        <p className="text-6xl font-bold gradient-text">Vibes</p>
        <p className="text-md mt-2 text-gray-400">
          All data is stored locally on your device for your privacy.
        </p>
      </div>

      <button
        className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white px-4 py-2 rounded-md text-lg drop-shadow-md hover:drop-shadow-lg transition-all"
        onClick={gotoVibeCheck}
      >
        Take a Vibe Check
      </button>
    </div>
  );
};

export default Home;
