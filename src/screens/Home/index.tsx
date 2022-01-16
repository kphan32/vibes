import type { NextPage } from "next";
import useHome from "./hooks/useHome";

const Home: NextPage = () => {
  const { gotoVibeCheck } = useHome();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center space-y-8 px-4 text-center">
      <div>
        <p className="text-5xl font-bold drop-shadow-lg gradient-text">Vibes</p>
        <p className="mt-2 text-gray-400">
          All data is stored locally, for your privacy
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
