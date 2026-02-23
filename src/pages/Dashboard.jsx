import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [total, setTotal] = useState(0);
  const [avgScore, setAvgScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (!user) return;

    const historyKey = `interviewHistory_${user.email}`;
    const history = JSON.parse(localStorage.getItem(historyKey)) || [];

    if (history.length > 0) {
      const totalInterviews = history.length;
      const scores = history.map((item) => item.score);

      const average = scores.reduce((a, b) => a + b, 0) / totalInterviews;

      const best = Math.max(...scores);

      setTotal(totalInterviews);
      setAvgScore(average.toFixed(1));
      setBestScore(best);
    } else {
      // Reset values if no history
      setTotal(0);
      setAvgScore(0);
      setBestScore(0);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Welcome, <span className="text-cyan-400">{user?.name}</span>
        </h1>

        <button
          onClick={() => setShowProfile(true)}
          className="text-2xl hover:text-cyan-400 transition"
        >
          👤
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-900 p-6 rounded-xl border border-cyan-500">
          <h2 className="text-lg font-semibold">Total Interviews</h2>
          <p className="text-2xl mt-2 text-cyan-400">{total}</p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-cyan-500">
          <h2 className="text-lg font-semibold">Average Score</h2>
          <p className="text-2xl mt-2 text-cyan-400">{avgScore}%</p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-cyan-500">
          <h2 className="text-lg font-semibold">Best Score</h2>
          <p className="text-2xl mt-2 text-cyan-400">{bestScore}%</p>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/start")}
          className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold transition"
        >
          Start New Interview
        </button>

        <button
          onClick={() => navigate("/analytics")}
          className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition"
        >
          View Analytics
        </button>
      </div>
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
          <div className="w-80 bg-zinc-900 h-full p-6 border-l border-cyan-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-cyan-400">Profile</h2>
              <button onClick={() => setShowProfile(false)}>✖</button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Name</p>
                <p className="font-semibold">{user?.name}</p>
              </div>

              <div>
                <p className="text-gray-400">Email</p>
                <p className="font-semibold">{user?.email}</p>
              </div>
              <div>
                <p className="text-gray-400">Course</p>
                <p className="font-semibold">
                  {user?.course || "Not specified"}
                </p>
              </div>
              <hr className="border-gray-700" />

              <div>
                <p className="text-gray-400">Total Interviews</p>
                <p className="font-semibold">{total}</p>
              </div>

              <div>
                <p className="text-gray-400">Average Score</p>
                <p className="font-semibold">{avgScore}%</p>
              </div>

              <div>
                <p className="text-gray-400">Best Score</p>
                <p className="font-semibold">{bestScore}%</p>
              </div>

              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/");
                }}
                className="mt-6 w-full bg-red-500 hover:bg-red-600 py-2 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
