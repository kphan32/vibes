import { Field, Form, Formik } from "formik";
import { Dispatch, FC, SetStateAction } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import useVibeChecks from "../../../../hooks/useVibeChecks";

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

const MoreButton = () => {
  return (
    <div
      className={`
      flex flex-col items-center
      text-gray-300
      group hover:text-gray-400
      transition-all duration-250
      cursor-pointer
      `}
    >
      Something more specific?
      <RiArrowDownSLine className="-my-1" />
    </div>
  );
};

interface VibeCheckFormProps {
  setSubmitted: Dispatch<SetStateAction<boolean>>;
}

const VibeCheckForm: FC<VibeCheckFormProps> = ({ setSubmitted }) => {
  const { addVibeCheck } = useVibeChecks();

  return (
    <div className="flex flex-col w-full h-full">
      <p className="text-5xl font-bold pb-8">Vibe Check</p>

      <Formik
        initialValues={{
          timestamp: new Date(),
          moodScore: 5.0,
          description: "",
        }}
        validate={() => []}
        onSubmit={(entry, _) => {
          addVibeCheck(entry);
          setSubmitted(true);
        }}
      >
        <Form className="w-full flex flex-col justify-center items-center space-y-8">
          <MoodSlider />
          <DescriptionField />
          <MoreButton />
          <Submit />
        </Form>
      </Formik>
    </div>
  );
};

export default VibeCheckForm;
