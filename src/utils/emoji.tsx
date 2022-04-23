const emojiFor = (moodScore: number) => {
  if (moodScore < 3.33) {
    return "😔";
  } else if (moodScore < 6.66) {
    return "😐";
  } else {
    return "😁";
  }
};

export { emojiFor };
