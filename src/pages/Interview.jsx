import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { evaluateAnswers } from "../utils/evaluate";
import { technicalQuestions, hrQuestions } from "../utils/questionBank";

export default function Interview() {
  const navigate = useNavigate();
  const config = JSON.parse(localStorage.getItem("interviewConfig"));

  const questionPool =
    config?.type === "Technical" ? technicalQuestions : hrQuestions;

  const selectedQuestions = questionPool.slice(0, config?.questions || 10);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(
    new Array(selectedQuestions.length).fill("")
  );
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(config?.duration * 60 || 600);
  const [reviewMode, setReviewMode] = useState(false);

  // ⏳ TIMER
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Load saved answer when question changes
  useEffect(() => {
    setCurrentAnswer(answers[currentIndex] || "");
  }, [currentIndex]);

  // ➡ NEXT
  const handleNext = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = currentAnswer;
    setAnswers(updatedAnswers);

    if (currentIndex + 1 < selectedQuestions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setReviewMode(true);
    }
  };

  // ⬅ PREVIOUS
  const handlePrevious = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = currentAnswer;
    setAnswers(updatedAnswers);

    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  
  //  FINAL SUBMIT
const handleFinalSubmit = () => {
  const updatedAnswers = [...answers];
  updatedAnswers[currentIndex] = currentAnswer;

  const result = evaluateAnswers(updatedAnswers);

  //  Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("User not found. Please login again.");
    navigate("/");
    return;
  }

  //  Create user-specific keys
  const historyKey = `interviewHistory_${user.email}`;
  const latestKey = `latestResult_${user.email}`;

  //  Get previous attempts of this user
  const previousAttempts =
    JSON.parse(localStorage.getItem(historyKey)) || [];

  const newAttempt = {
    date: new Date().toLocaleString(),
    type: config?.type,
    score: result.overall,
    communication: result.communication,
    confidence: result.confidence,
  };

  const updatedHistory = [...previousAttempts, newAttempt];

  //  Save per-user data
  localStorage.setItem(historyKey, JSON.stringify(updatedHistory));
  localStorage.setItem(latestKey, JSON.stringify(newAttempt));

  navigate("/analytics");
};

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // 🔎 REVIEW SCREEN
  if (reviewMode) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <h2 className="text-2xl font-bold mb-6 text-cyan-400">
          Review & Submit
        </h2>

        <div className="space-y-4 mb-6">
          {selectedQuestions.map((q, i) => (
            <div
              key={i}
              className="bg-zinc-900 p-4 rounded border border-cyan-500"
            >
              <p className="font-semibold mb-2">
                Q{i + 1}: {q}
              </p>
              <p className="text-gray-400">
                {answers[i] || "No answer provided"}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setReviewMode(false)}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded"
          >
            Go Back
          </button>

          <button
            onClick={handleFinalSubmit}
            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded font-semibold"
          >
            Submit Interview
          </button>
        </div>
      </div>
    );
  }

  // 🧠 MAIN INTERVIEW SCREEN
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold text-cyan-400">
          Question {currentIndex + 1} / {selectedQuestions.length}
        </h2>
        <span className="text-red-400 font-semibold">{formatTime()}</span>
      </div>

      <div className="bg-zinc-900 p-6 rounded-xl border border-cyan-500 mb-6">
        <p className="text-lg">{selectedQuestions[currentIndex]}</p>
      </div>

      <textarea
        value={currentAnswer}
        onChange={(e) => setCurrentAnswer(e.target.value)}
        placeholder="Type your answer here..."
        className="w-full h-32 p-3 bg-black border border-gray-700 rounded mb-6 focus:border-cyan-400 outline-none"
      />

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded disabled:opacity-40"
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded font-semibold"
        >
          {currentIndex + 1 === selectedQuestions.length
            ? "Review & Submit"
            : "Next"}
        </button>
      </div>
    </div>
  );
}