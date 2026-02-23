export function evaluateAnswers(answers) {
  let totalScore = 0;
  let communication = 0;
  let confidence = 0;

  answers.forEach((answer) => {
    if (!answer) return;

    // Length based scoring
    if (answer.length > 80) totalScore += 10;
    else if (answer.length > 40) totalScore += 5;
    else totalScore += 2;

    // Communication score
    if (answer.includes(".")) communication += 5;
    else communication += 2;

    // Confidence keywords
    if (
      answer.toLowerCase().includes("experience") ||
      answer.toLowerCase().includes("project") ||
      answer.toLowerCase().includes("built")
    ) {
      confidence += 5;
    }
  });

  const maxScore = answers.length * 10;

  return {
    overall: Math.min(Math.round((totalScore / maxScore) * 100), 100),
    communication: Math.min(
      Math.round((communication / (answers.length * 5)) * 100),
      100,
    ),
    confidence: Math.min(
      Math.round((confidence / (answers.length * 5)) * 100),
      100,
    ),
  };
}
