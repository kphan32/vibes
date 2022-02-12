import clsx from "clsx";
import { FC, useState } from "react";
import moods, { MoodNode } from "../../../../meta/moods";

interface MoodSelectionProps {
  showMoods: boolean;
  setMood: (mood: string) => void;
}

const MoodSelection: FC<MoodSelectionProps> = ({ showMoods, setMood }) => {
  return (
    <div
      className={clsx("overflow-hidden transition-all duration-500", {
        "h-0 opacity-0": !showMoods,
        "h-64 opacity-100": showMoods,
      })}
    >
      <div className="flex flex-row flex-wrap w-72 justify-center">
        {moods.map((mood, i) => (
          <MoodOption
            setMood={setMood}
            mood={mood}
            key={i}
            index={i}
            depth={0}
          />
        ))}
      </div>
    </div>
  );
};

interface MoodOptionProps {
  setMood: (mood: string) => void;
  mood: MoodNode;
  index: number;
  depth: number;
}

const MoodOption: FC<MoodOptionProps> = ({ setMood, mood, index, depth }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div
      key={index}
      className={clsx(
        `
        flex flex-col items-center space-y-2
        w-[${8 - depth}rem]
        py-2
        border-2 rounded-md
        bg-white
        hover:border-cyan-400
        transition-color duration-300
        pointer-events-auto
        cursor-pointer
      `,
        { "m-2": depth === 0 }
      )}
      onClick={(e) => {
        if (mood.choices.length === 0) {
          setMood(mood.text);
        } else {
          setExpanded((currentlyExanded) => !currentlyExanded);
        }

        e.stopPropagation();
      }}
    >
      <p>
        {mood.text}
        {index}
      </p>

      <div
        className={clsx(`w-[${8 - 1 - depth}rem] z-[${depth}]`, {
          hidden: !expanded,
        })}
      >
        {mood.choices.map((subMood, i) => {
          return (
            <MoodOption
              setMood={setMood}
              mood={subMood}
              key={i}
              index={i}
              depth={depth + 1}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MoodSelection;
