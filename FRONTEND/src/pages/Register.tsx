import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";

const Register = () => {
  const [searchParams] = useSearchParams();
  const defaultType =
    (searchParams.get("type") as "individual" | "team") || "individual";
  const [accountType, setAccountType] = useState<"individual" | "team">(
    defaultType,
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) return setError("Fill in all fields");
    setLoading(true);
    setError("");
    try {
      const data = await api.post<{ token: string; accountType: string }>(
        "/api/auth/register",
        { name, email, password, accountType },
      );
      login(data.token);
      navigate("/onboarding");
    } catch {
      setError("Registration failed. Try again.");
    }
    setLoading(false);
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
          <h1 className="text-xl font-semibold text-white">
            Create an account
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Start tracking your repositories
          </p>
        </div>

        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6">
          {/* Account type selector */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <button
              onClick={() => setAccountType("individual")}
              className={`py-2 rounded-lg text-sm font-medium transition ${
                accountType === "individual"
                  ? "bg-blue-600 text-white"
                  : "bg-[#0a0a0a] text-gray-500 border border-[#1f1f1f] hover:text-white"
              }`}
            >
              👤 Individual
            </button>
            <button
              onClick={() => setAccountType("team")}
              className={`py-2 rounded-lg text-sm font-medium transition ${
                accountType === "team"
                  ? "bg-purple-600 text-white"
                  : "bg-[#0a0a0a] text-gray-500 border border-[#1f1f1f] hover:text-white"
              }`}
            >
              👥 Team
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-3 py-2 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-blue-500 transition"
            />
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
              className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-blue-500 transition"
            />
            <button
              onClick={handleRegister}
              disabled={loading}
              className={`w-full text-white text-sm font-medium py-2.5 rounded-lg transition disabled:opacity-50 ${
                accountType === "team"
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading
                ? "Creating account..."
                : `Create ${accountType} account`}
            </button>
          </div>

          <p className="text-center text-gray-700 text-xs mt-4">
            Have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
