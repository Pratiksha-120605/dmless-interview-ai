import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "BTech",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(form));
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-xl w-96 border border-cyan-500"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 mb-4 bg-black border border-gray-700 rounded focus:border-cyan-400 outline-none"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 bg-black border border-gray-700 rounded focus:border-cyan-400 outline-none"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <select
          className="w-full p-2 mb-6 bg-black border border-gray-700 rounded focus:border-cyan-400 outline-none"
          onChange={(e) => setForm({ ...form, course: e.target.value })}
        >
          <option>BTech</option>
          <option>BCA</option>
          <option>BSc</option>
          <option>Other</option>
        </select>

        <button className="w-full bg-cyan-500 hover:bg-cyan-600 py-2 rounded font-semibold transition">
          Sign Up
        </button>
      </form>
    </div>
  );
}
