import { Field, Form, Formik } from "formik";

const MoodSlider = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <label
        htmlFor="moodScore"
        className="text-3xl font-bold pb-2 drop-shadow-md««"
      >
        How are you feeling?
      </label>
      <Field
        id="moodScore"
        className="w-60 mood-score-slider"
        type="range"
        name="moodScore"
        min={0}
        max={10}
      />
      <div className="w-64 flex flex-row justify-between select-none">
        <p className="w-10 text-center text-2xl drop-shadow-md">😔</p>
        <p className="w-10 text-center text-2xl drop-shadow-md">😐</p>
        <p className="w-10 text-center text-2xl drop-shadow-md">😁</p>
      </div>
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

const EntryForm = () => {
  return (
    <div className="flex justify-center w-full">
      <Formik
        initialValues={{
          timestamp: Date.now(),
          moodScore: 5.0,
          description: null,
        }}
        validate={() => []}
        onSubmit={(values, data) => {
          console.info("Submitted", values);
        }}
      >
        <Form className="w-full flex flex-col justify-center items-center space-y-4">
          <MoodSlider />
          <Submit />
        </Form>
      </Formik>
    </div>
  );
};

export default EntryForm;
