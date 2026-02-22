import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-white">
      {/* Left Branding Section */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-slate-800 items-center justify-center">
        <div className="text-center px-10">
          <h1 className="text-5xl font-bold mb-4">Dmless</h1>
          <p className="text-lg text-gray-200">
            Smart Hiring Links with Knockout Screening.
          </p>
        </div>
      </div>

      {/* Right Login Section */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-slate-900 p-10 rounded-2xl shadow-xl space-y-6"
        >
          <h2 className="text-3xl font-semibold text-center">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-slate-800 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-slate-800 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-indigo-600 py-3 rounded-lg hover:bg-indigo-700 transition">
            {isLogin ? "Login" : "Sign Up"}
          </button>

          <p
            className="text-sm text-center text-gray-400 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
