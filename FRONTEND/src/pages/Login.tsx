import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5003";

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { token } = await api.post<{ token: string }>("/api/auth/login", {
        email,
        password,
      });

      login(token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">D</span>
            </div>
            <span className="text-white font-semibold">DevPulse</span>
          </Link>

          <h1 className="text-xl font-semibold text-white">Welcome back</h1>
          <p className="text-gray-600 text-sm mt-1">Sign in to your account</p>
        </div>

        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6">
          {/* GitHub Auth Button */}
          <a
            href={`${API_URL}/api/github/auth`}
            className="flex items-center justify-center gap-2 w-full bg-[#1f1f1f] hover:bg-[#2d2d2d] text-white text-sm font-medium py-2.5 rounded-lg transition mb-4 border border-[#2d2d2d]"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Continue with GitHub
          </a>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-[#1f1f1f]" />
            <span className="text-gray-700 text-xs">or</span>
            <div className="flex-1 h-px bg-[#1f1f1f]" />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-3 py-2 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-blue-500 transition"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-blue-500 transition"
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-100 text-black text-sm font-medium py-2.5 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <p className="text-center text-gray-700 text-xs mt-4">
            No account?{" "}
            <Link to="/register" className="text-blue-400 hover:text-blue-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
