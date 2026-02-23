import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StartInterview() {
  const navigate = useNavigate();

  const [type, setType] = useState("Technical");
  const [duration, setDuration] = useState(10);
  const [questions, setQuestions] = useState(10);

  const handleStart = () => {
    const interviewConfig = {
      type,
      duration,
      questions,
    };

    localStorage.setItem("interviewConfig", JSON.stringify(interviewConfig));
    navigate("/interview");
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center p-6">
      <div className="bg-zinc-900 p-8 rounded-xl w-full max-w-lg border border-cyan-500">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Setup Your Interview
        </h2>

        {/* Interview Type */}
        <div className="mb-4">
          <label className="block mb-2 text-cyan-400">Interview Type</label>
          <select
            className="w-full p-2 bg-black border border-gray-700 rounded"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Technical</option>
            <option>HR</option>
          </select>
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label className="block mb-2 text-cyan-400">Duration (Minutes)</label>
          <select
            className="w-full p-2 bg-black border border-gray-700 rounded"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          >
            <option value={10}>10 Minutes</option>
            <option value={15}>15 Minutes</option>
          </select>
        </div>

        {/* Questions */}
        <div className="mb-6">
          <label className="block mb-2 text-cyan-400">
            Number of Questions
          </label>
          <select
            className="w-full p-2 bg-black border border-gray-700 rounded"
            value={questions}
            onChange={(e) => setQuestions(Number(e.target.value))}
          >
            <option value={10}>10 Questions</option>
            <option value={15}>15 Questions</option>
          </select>
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-cyan-500 hover:bg-cyan-600 py-2 rounded font-semibold transition"
        >
          Start Interview
        </button>
      </div>
    </div>
  );
}
