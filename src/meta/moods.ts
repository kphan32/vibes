interface MoodNode {
  text: string;
  choices: MoodNode[];
}

const moods: MoodNode[] = [
  {
    text: "Happy",
    choices: [
      {
        text: "Playful",
        choices: [
          { text: "Aroused", choices: [] },
          { text: "Cheeky", choices: [] },
        ],
      },
      {
        text: "Content",
        choices: [
          { text: "Free", choices: [] },
          { text: "Joyful", choices: [] },
        ],
      },
      {
        text: "Interested",
        choices: [
          { text: "Curious", choices: [] },
          { text: "Inquisitive", choices: [] },
        ],
      },
      {
        text: "Proud",
        choices: [
          { text: "Successful", choices: [] },
          { text: "Confident", choices: [] },
        ],
      },
      {
        text: "Accepted",
        choices: [
          { text: "Respected", choices: [] },
          { text: "Valued", choices: [] },
        ],
      },
      {
        text: "Powerful",
        choices: [
          { text: "Courageous", choices: [] },
          { text: "Creative", choices: [] },
        ],
      },
      {
        text: "Peaceful",
        choices: [
          { text: "Loving", choices: [] },
          { text: "Thankful", choices: [] },
        ],
      },
      {
        text: "Trusting",
        choices: [
          { text: "Sensitive", choices: [] },
          { text: "Intimate", choices: [] },
        ],
      },
      {
        text: "Optimistic",
        choices: [
          { text: "Hopeful", choices: [] },
          { text: "Inspired", choices: [] },
        ],
      },
    ],
  },
  {
    text: "Sad",
    choices: [
      {
        text: "Lonely",
        choices: [
          { text: "Isolated", choices: [] },
          { text: "Abandoned", choices: [] },
        ],
      },
      {
        text: "Vulnerable",
        choices: [
          { text: "Victimized", choices: [] },
          { text: "Fragile", choices: [] },
        ],
      },
      {
        text: "Despair",
        choices: [
          { text: "Grief", choices: [] },
          { text: "Powerless", choices: [] },
        ],
      },
      {
        text: "Guilty",
        choices: [
          { text: "Ashamed", choices: [] },
          { text: "Remorseful", choices: [] },
        ],
      },
      {
        text: "Depressed",
        choices: [
          { text: "Inferior", choices: [] },
          { text: "Empty", choices: [] },
        ],
      },
      {
        text: "Hurt",
        choices: [
          { text: "Embarassed", choices: [] },
          { text: "Disappointed", choices: [] },
        ],
      },
    ],
  },
  {
    text: "Disgusted",
    choices: [
      {
        text: "Disapproving",
        choices: [
          { text: "Judgemental", choices: [] },
          { text: "Embarassed", choices: [] },
        ],
      },
      {
        text: "Disappointed",
        choices: [
          { text: "Apalled", choices: [] },
          { text: "Revolted", choices: [] },
        ],
      },
      {
        text: "Awful",
        choices: [
          { text: "Nauseated", choices: [] },
          { text: "Detestable", choices: [] },
        ],
      },
      {
        text: "Repelled",
        choices: [
          { text: "Horrified", choices: [] },
          { text: "Hesitant", choices: [] },
        ],
      },
    ],
  },
  {
    text: "Angry",
    choices: [
      {
        text: "Let down",
        choices: [
          { text: "Betrayed", choices: [] },
          { text: "Resentful", choices: [] },
        ],
      },
      {
        text: "Humiliated",
        choices: [
          { text: "Disrespected", choices: [] },
          { text: "Ridiculed", choices: [] },
        ],
      },
      {
        text: "Bitter",
        choices: [
          { text: "Indignant", choices: [] },
          { text: "Violated", choices: [] },
        ],
      },
      {
        text: "Mad",
        choices: [
          { text: "Furious", choices: [] },
          { text: "Jealous", choices: [] },
        ],
      },
      {
        text: "Aggressive",
        choices: [
          { text: "Provoked", choices: [] },
          { text: "Hostile", choices: [] },
        ],
      },
      {
        text: "Frustrated",
        choices: [
          { text: "Infuriated", choices: [] },
          { text: "Annoyed", choices: [] },
        ],
      },
      {
        text: "Distant",
        choices: [
          { text: "Withdrawn", choices: [] },
          { text: "Numb", choices: [] },
        ],
      },
      {
        text: "Critical",
        choices: [
          { text: "Skeptical", choices: [] },
          { text: "Dismissive", choices: [] },
        ],
      },
    ],
  },
  {
    text: "Fearful",
    choices: [
      {
        text: "Scared",
        choices: [
          { text: "Helpless", choices: [] },
          { text: "Frightened", choices: [] },
        ],
      },
      {
        text: "Anxious",
        choices: [
          { text: "Overwhelmed", choices: [] },
          { text: "Worried", choices: [] },
        ],
      },
      {
        text: "Insecure",
        choices: [
          { text: "Inadequate", choices: [] },
          { text: "Inferior", choices: [] },
        ],
      },
      {
        text: "Weak",
        choices: [
          { text: "Worthless", choices: [] },
          { text: "Insignificant", choices: [] },
        ],
      },
      {
        text: "Rejected",
        choices: [
          { text: "Excluded", choices: [] },
          { text: "Persecuted", choices: [] },
        ],
      },
      {
        text: "Threatened",
        choices: [
          { text: "Nervous", choices: [] },
          { text: "Exposed", choices: [] },
        ],
      },
    ],
  },
  {
    text: "Bad",
    choices: [
      {
        text: "Bored",
        choices: [
          { text: "Indifferent", choices: [] },
          { text: "Apathetic", choices: [] },
        ],
      },
      {
        text: "Busy",
        choices: [
          { text: "Pressured", choices: [] },
          { text: "Rushed", choices: [] },
        ],
      },
      {
        text: "Stressed",
        choices: [
          { text: "Overwhelmed", choices: [] },
          { text: "Out of control", choices: [] },
        ],
      },
      {
        text: "Tired",
        choices: [
          { text: "Sleepy", choices: [] },
          { text: "Unfocused", choices: [] },
        ],
      },
    ],
  },
  {
    text: "Surprised",
    choices: [
      {
        text: "Startled",
        choices: [
          { text: "Shocked", choices: [] },
          { text: "Dismayed", choices: [] },
        ],
      },
      {
        text: "Confused",
        choices: [
          { text: "Disillusioned", choices: [] },
          { text: "Perplexed", choices: [] },
        ],
      },
      {
        text: "Amazed",
        choices: [
          { text: "Astonished", choices: [] },
          { text: "Awe", choices: [] },
        ],
      },
      {
        text: "Excited",
        choices: [
          { text: "Eager", choices: [] },
          { text: "Energetic", choices: [] },
        ],
      },
    ],
  },
];

export type { MoodNode };

export default moods;
