import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function Analytics() {
  const navigate = useNavigate();

  //  Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <button
          onClick={() => navigate("/")}
          className="bg-cyan-500 px-6 py-2 rounded"
        >
          Login Again
        </button>
      </div>
    );
  }

  //  Create user-specific keys
  const historyKey = `interviewHistory_${user.email}`;
  const latestKey = `latestResult_${user.email}`;

  const latestResult = JSON.parse(localStorage.getItem(latestKey));
  const history = JSON.parse(localStorage.getItem(historyKey)) || [];
  if (!latestResult) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <button
          onClick={() => navigate("/")}
          className="bg-cyan-500 px-6 py-2 rounded"
        >
          Start Interview
        </button>
      </div>
    );
  }

  const getBadge = (score) => {
    if (score >= 80) return "Excellent 🚀";
    if (score >= 60) return "Good 👍";
    return "Needs Improvement 📈";
  };

  // 📊 Chart Data
  const chartData = {
    labels: history.map((_, index) => `Attempt ${index + 1}`),
    datasets: [
      {
        label: "Overall Score",
        data: history.map((item) => item.score),
        borderColor: "cyan",
        backgroundColor: "rgba(0,255,255,0.2)",
        tension: 0.3,
      },
    ],
  };

  // feedback
  const generateFeedback = () => {
    const { score, communication, confidence } = latestResult;

    let feedback = "";

    if (score >= 80) {
      feedback += "Excellent overall performance! ";
    } else if (score >= 60) {
      feedback += "Good job! You have a solid foundation. ";
    } else {
      feedback += "You have potential, but improvement is needed. ";
    }

    if (communication >= 75) {
      feedback += "Your communication skills are strong and clear. ";
    } else {
      feedback +=
        "Work on structuring your answers more clearly and confidently. ";
    }

    if (confidence >= 75) {
      feedback += "You showed great confidence throughout the interview. ";
    } else {
      feedback +=
        "Try practicing mock interviews to boost your confidence level. ";
    }

    feedback +=
      "Keep practicing consistently to improve your interview performance.";

    return feedback;
  };
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-cyan-400 mb-8">
        Interview Performance Analytics
      </h1>

      {/* SCORE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-zinc-900 p-6 rounded-xl border border-cyan-500">
          <h3 className="text-lg text-gray-400 mb-2">Overall Score</h3>
          <p className="text-3xl font-bold text-cyan-400">
            {latestResult.score}%
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-cyan-500">
          <h3 className="text-lg text-gray-400 mb-2">Communication</h3>
          <p className="text-3xl font-bold text-cyan-400">
            {latestResult.communication}%
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-cyan-500">
          <h3 className="text-lg text-gray-400 mb-2">Confidence</h3>
          <p className="text-3xl font-bold text-cyan-400">
            {latestResult.confidence}%
          </p>
        </div>
      </div>

      {/* PERFORMANCE BADGE */}
      <div className="bg-zinc-900 p-6 rounded-xl border border-green-500 mb-10">
        <h3 className="text-xl font-semibold mb-2">Performance Level</h3>
        <p className="text-2xl">{getBadge(latestResult.score)}</p>
      </div>
      {/* 🧠 AI FEEDBACK */}
      <div className="bg-zinc-900 p-6 rounded-xl border border-purple-500 mb-10">
        <h3 className="text-xl font-semibold mb-4 text-purple-400">
          AI Performance Feedback
        </h3>
        <p className="text-gray-300 leading-relaxed">{generateFeedback()}</p>
      </div>
      {/* 📈 PERFORMANCE GRAPH */}
      <div className="bg-zinc-900 p-6 rounded-xl border border-cyan-500 mb-10">
        <h3 className="text-xl font-semibold mb-4">Performance Trend</h3>

        {history.length > 0 ? (
          <Line data={chartData} />
        ) : (
          <p>No interview data available yet.</p>
        )}
      </div>

      {/* ATTEMPT HISTORY */}
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">
        Previous Attempts
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700">
          <thead className="bg-zinc-800">
            <tr>
              <th className="p-3 border border-gray-700">Date</th>
              <th className="p-3 border border-gray-700">Type</th>
              <th className="p-3 border border-gray-700">Score</th>
              <th className="p-3 border border-gray-700">Communication</th>
              <th className="p-3 border border-gray-700">Confidence</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="p-3 border border-gray-700">{item.date}</td>
                <td className="p-3 border border-gray-700">{item.type}</td>
                <td className="p-3 border border-gray-700">{item.score}%</td>
                <td className="p-3 border border-gray-700">
                  {item.communication}%
                </td>
                <td className="p-3 border border-gray-700">
                  {item.confidence}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* NEW INTERVIEW BUTTON */}
      <div className="mt-10">
        <button
          onClick={() => navigate("/")}
          className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded font-semibold"
        >
          Start New Interview
        </button>
      </div>
    </div>
  );
}
