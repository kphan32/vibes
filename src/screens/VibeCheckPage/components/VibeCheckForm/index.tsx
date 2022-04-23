import { Text } from "@/components/common";
import useVibeChecks from "@/hooks/useVibeChecks";
import { Field, Form, Formik } from "formik";
import Zoom from "react-medium-image-zoom";
import { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import tw from "tailwind-styled-components";

import "react-medium-image-zoom/dist/styles.css";

const VibeCheckForm: FC<VibeCheckFormProps> = ({ submitted, setSubmitted }) => {
  const { addVibeCheck } = useVibeChecks();
  const [showMoodWheel, setShowMoodWheel] = useState<boolean>(false);

  const toggleMoodWheel = useCallback(
    () => setShowMoodWheel((showMoodWheel) => !showMoodWheel),
    [setShowMoodWheel]
  );

  return (
    <Screen visible={!submitted}>
      <Title>Vibe Check</Title>

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
        <Form className="w-full flex flex-col justify-center items-center space-y-8 pb-8">
          <MoodSlider />
          <DescriptionField />
          <div>
            <ShowMoodWheelButton
              showMoodWheel={showMoodWheel}
              toggleMoodWheel={toggleMoodWheel}
            />
            <MoodWheel visible={showMoodWheel}>
              <Zoom>
                <img src="/images/mood_wheel.png" />
              </Zoom>
            </MoodWheel>
          </div>
          <Submit />
        </Form>
      </Formik>
    </Screen>
  );
};

const Screen = tw.div`
  w-screen
  h-screen

  flex
  flex-col
  justify-start
  items-center

  overflow-x-hidden
  overflow-scroll-y

  pt-20

  transition-all
  ${(props: VisibleProps) => (props.visible ? "opacity-100" : "opacity-0")}
`;

const Title = tw(Text)`
  text-5xl
  font-bold

  pb-6
`;

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
  showMoodWheel: boolean;
  toggleMoodWheel: () => void;
}

const ShowMoodWheelButton: FC<MoreButtonProps> = ({
  showMoodWheel: showMoodWheel,
  toggleMoodWheel: toggleShowMoods,
}) => {
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
      {!showMoodWheel && (
        <>
          Not sure how you&apos;re feeling?
          <RiArrowDownSLine className="-my-1" />
        </>
      )}
      {showMoodWheel && (
        <>
          <RiArrowDownSLine className="-my-1 rotate-180" />
          Close
        </>
      )}
    </div>
  );
};

const MoodWheel = tw.div<VisibleProps>`
  z-50

  w-64

  overflow-visible

  transition-all
  ${(props: VisibleProps) => (props.visible ? "" : "hidden")}
`;

interface VisibleProps {
  visible: boolean;
}

interface VibeCheckFormProps {
  submitted: boolean;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
}

export default VibeCheckForm;
