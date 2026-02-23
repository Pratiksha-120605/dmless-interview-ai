import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="h-screen flex flex-col justify-center items-center px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        AI Interview <span className="text-cyan-400">Simulator</span>
      </h1>

      <p className="text-gray-400 mb-8 max-w-xl">
        Practice Technical & HR interviews with real-time AI feedback and
        improve your placement performance.
      </p>

      <div className="flex gap-4">
        <Link
          to="/signup"
          className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-lg font-semibold transition"
        >
          Get Started
        </Link>

        <Link
          to="/login"
          className="border border-cyan-500 text-cyan-400 px-6 py-2 rounded-lg hover:bg-cyan-500 hover:text-black transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
