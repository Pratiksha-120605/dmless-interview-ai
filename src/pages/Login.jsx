import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email) {
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error("User not found. Please signup first.");
      navigate("/signup");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-8 rounded-xl w-96 border border-cyan-500"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 mb-6 bg-black border border-gray-700 rounded focus:border-cyan-400 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full bg-cyan-500 hover:bg-cyan-600 py-2 rounded font-semibold transition">
          Login
        </button>
      </form>
    </div>
  );
}
