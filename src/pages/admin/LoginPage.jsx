import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/login",
        { email, password },
      );

      toast.success(res.data.message || "Login successful");
      localStorage.setItem("token", res.data.token);
      console.log("Login Response role:", res.data.role);

      if (res.data.role === "admin") {
        navigate("/admin/qs-jobs");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
      {/* subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-purple-600/10" />

      {/* login card */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-md rounded-2xl border border-slate-800
                   bg-slate-900/70 backdrop-blur-xl p-8 shadow-2xl"
      >
        <h1 className="text-3xl font-semibold text-white text-center">
          Sign In
        </h1>
        <p className="text-sm text-slate-400 text-center mt-2 mb-8">
          Access your dashboard
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            className="w-full h-11 px-3 rounded-lg bg-slate-950 border border-slate-800
                       text-slate-200 outline-none
                       focus:ring-1 focus:ring-indigo-600"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full h-11 px-3 rounded-lg bg-slate-950 border border-slate-800
                       text-slate-200 outline-none
                       focus:ring-1 focus:ring-indigo-600"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-11 rounded-lg bg-indigo-600 hover:bg-indigo-700
                     text-white font-semibold transition active:scale-95"
        >
          Login
        </button>

        {/* Optional helper */}
        <p className="mt-6 text-xs text-slate-400 text-center">
          Authorized access only
        </p>
      </form>
    </div>
  );
}
