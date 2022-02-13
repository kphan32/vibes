const emojiFor = (moodScore: number) => {
  if (moodScore < 0.33) {
    return "😔";
  } else if (moodScore < 0.66) {
    return "😐";
  } else {
    return "😁";
  }
};

export { emojiFor };
