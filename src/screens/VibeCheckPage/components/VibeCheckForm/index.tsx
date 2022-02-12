import clsx from "clsx";
import { Field, Form, Formik } from "formik";
import { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import useVibeChecks from "../../../../hooks/useVibeChecks";
import moods, { MoodNode } from "../../../../meta/moods";
import VibeCheck from "../../../../types/vibeCheck";
import MoodSelection from "./MoodSelection";

const MoodSlider = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <label
        htmlFor="moodScore"
        className="text-2xl font-bold pb-2 drop-shadow-md««"
      >
        How are you feeling?
      </label>
      <Field
        id="moodScore"
        className="w-60 mood-score-slider"
        type="range"
        name="moodScore"
        step={0.5}
        min={0.0}
        max={10.0}
      />
      <div className="w-64 flex flex-row justify-between select-none">
        <p className="w-10 text-center text-2xl drop-shadow-md">😔</p>
        <p className="w-10 text-center text-2xl drop-shadow-md">😐</p>
        <p className="w-10 text-center text-2xl drop-shadow-md">😁</p>
      </div>
    </div>
  );
};

const DescriptionField = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <label htmlFor="description" className="hidden">
        Description
      </label>
      <Field
        id="description"
        as="textarea"
        name="description"
        className="w-64 h-32 p-2 resize-none rounded-md border-2 shadow-md focus:outline-none focus:ring-2"
        placeholder="Write your thoughts here..."
      />
    </div>
  );
};

const Submit = () => {
  return (
    <button
      className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white w-48 h-12 rounded-md text-xl drop-shadow-md hover:drop-shadow-lg transition-all"
      type="submit"
    >
      Submit
    </button>
  );
};

interface MoreButtonProps {
  showMoods: boolean;
  toggleShowMoods: () => void;
}

const MoreButton: FC<MoreButtonProps> = ({ showMoods, toggleShowMoods }) => {
  return (
    <div
      className={`
      flex flex-col items-center
      text-gray-300
      group hover:text-gray-400
      transition-all duration-250
      cursor-pointer
      `}
      onClick={() => toggleShowMoods()}
    >
      {!showMoods && (
        <>
          Something more specific?
          <RiArrowDownSLine className="-my-1" />
        </>
      )}
      {showMoods && (
        <>
          <RiArrowDownSLine className="-my-1 rotate-180" />
          Less specific
        </>
      )}
    </div>
  );
};

interface VibeCheckFormProps {
  setSubmitted: Dispatch<SetStateAction<boolean>>;
}

const VibeCheckForm: FC<VibeCheckFormProps> = ({ setSubmitted }) => {
  const initialValues: VibeCheck = {
    timestamp: new Date(),
    moodScore: 5.0,
    description: "",
    mood: "",
  };

  const { addVibeCheck } = useVibeChecks();
  const [showMoods, setShowMoods] = useState<boolean>(false);

  const toggleShowMoods = useCallback(
    () => setShowMoods((showMoods) => !showMoods),
    [setShowMoods]
  );

  const [mood, setMood] = useState<string | null>(null);

  return (
    <div className="flex flex-col w-full h-full">
      <p className="text-5xl font-bold pb-8">Vibe Check</p>

      <Formik
        initialValues={initialValues}
        validate={() => []}
        onSubmit={(entry, _) => {
          entry.mood = mood;

          addVibeCheck(entry);
          setSubmitted(true);
        }}
      >
        <Form className="w-full flex flex-col justify-center items-center space-y-8 pb-8">
          <MoodSlider />
          {/* <div className="space-y-2">
            <MoreButton
              showMoods={showMoods}
              toggleShowMoods={toggleShowMoods}
            />
            <MoodSelection showMoods={showMoods} setMood={setMood} />
          </div> */}
          <DescriptionField />
          <Submit />
        </Form>
      </Formik>
    </div>
  );
};

export default VibeCheckForm;
