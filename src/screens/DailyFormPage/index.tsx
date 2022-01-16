import type { NextPage } from "next";
import DailyForm from "../../components/DailyForm";

const DailyFormPage: NextPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center space-y-8 px-4 text-center">
      <p className="text-4xl font-bold drop-shadow-lg">
        Next.js + TypeScript + TailwindCSS PWA
      </p>
      <DailyForm />
    </div>
  );
};

export default DailyFormPage;
