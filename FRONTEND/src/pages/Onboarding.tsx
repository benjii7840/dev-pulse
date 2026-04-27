import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";
import { Team } from "../types";

const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"create" | "join">("create");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5003";

  const handleCreateTeam = async () => {
    if (!teamName) return setError("Enter a team name");
    setLoading(true);
    try {
      const team = await api.post<Team>("/api/teams", { name: teamName });
      navigate(`/team/${team._id}`);
    } catch {
      setError("Failed to create team");
    }
    setLoading(false);
  };

  const handleJoinTeam = async () => {
    if (!inviteCode) return setError("Enter an invite code");
    setLoading(true);
    try {
      const team = await api.post<Team>("/api/teams/join", { inviteCode });
      navigate(`/team/${team._id}`);
    } catch {
      setError("Invalid invite code");
    }
    setLoading(false);
  };

  if (user?.accountType === "individual") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <h1 className="text-xl font-semibold text-white mb-2">
            Welcome, {user.name}!
          </h1>
          <p className="text-gray-600 text-sm mb-8">
            Connect your GitHub account to start tracking your repositories.
          </p>
          <a
            href={`${API_URL}/api/github/auth`}
            className="flex items-center justify-center gap-2 w-full bg-white hover:bg-gray-100 text-black text-sm font-medium py-2.5 rounded-lg transition mb-3"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Connect GitHub
          </a>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full text-gray-600 hover:text-white text-sm py-2 transition"
          >
            Skip for now →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">👥</span>
          </div>
          <h1 className="text-xl font-semibold text-white">Set up your team</h1>
          <p className="text-gray-600 text-sm mt-1">
            Create a new team or join an existing one
          </p>
        </div>

        <div className="bg-[#111111] border border-[#1f1f1f] rounded-2xl p-6">
          <div className="grid grid-cols-2 gap-2 mb-6">
            <button
              onClick={() => setMode("create")}
              className={`py-2 rounded-lg text-sm transition ${
                mode === "create"
                  ? "bg-purple-600 text-white"
                  : "bg-[#0a0a0a] text-gray-500 border border-[#1f1f1f]"
              }`}
            >
              Create team
            </button>
            <button
              onClick={() => setMode("join")}
              className={`py-2 rounded-lg text-sm transition ${
                mode === "join"
                  ? "bg-purple-600 text-white"
                  : "bg-[#0a0a0a] text-gray-500 border border-[#1f1f1f]"
              }`}
            >
              Join team
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-3 py-2 rounded-lg mb-4">
              {error}
            </div>
          )}

          {mode === "create" ? (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Team name"
                className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-purple-500 transition"
              />
              <button
                onClick={handleCreateTeam}
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2.5 rounded-lg transition disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create team"}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                placeholder="Invite code (e.g. A1B2C3)"
                className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-700 focus:outline-none focus:border-purple-500 transition font-mono"
              />
              <button
                onClick={handleJoinTeam}
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2.5 rounded-lg transition disabled:opacity-50"
              >
                {loading ? "Joining..." : "Join team"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
