import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { api } from "../utils/api";
import { Repo } from "../types";

const Dashboard = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState("");
  const [name, setName] = useState("");
  const [adding, setAdding] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5003";

  useEffect(() => {
    api
      .get<Repo[]>("/api/repos")
      .then(setRepos)
      .finally(() => setLoading(false));
  }, []);

  const handleAddRepo = async () => {
    if (!owner || !name) return;
    setAdding(true);
    setError("");
    try {
      const repo = await api.post<Repo>("/api/repos", { owner, name });
      setRepos([...repos, repo]);
      setOwner("");
      setName("");
      setShowForm(false);
    } catch {
      setError("Failed to add repo. Check the owner and name.");
    }
    setAdding(false);
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/api/repos/${id}`);
    setRepos(repos.filter((r) => r._id !== id));
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-semibold text-white">Repositories</h1>
            <p className="text-gray-600 text-sm mt-0.5">
              Track your GitHub repositories
            </p>
          </div>

          <div className="flex gap-2">
            <a
              href={`${API_URL}/api/github/auth`}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#111111] border border-[#1f1f1f] text-gray-400 hover:text-white text-sm rounded-lg transition"
            >
              Connect GitHub
            </a>

            <button
              onClick={() => setShowForm(!showForm)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition"
            >
              + Add Repo
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-4 mb-6">
            <p className="text-white text-sm font-medium mb-3">
              Add Repository
            </p>
            {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

            <div className="flex gap-2">
              <input
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                placeholder="Owner"
                className="flex-1 bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2 text-white text-sm"
              />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Repo name"
                className="flex-1 bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2 text-white text-sm"
              />
              <button
                onClick={handleAddRepo}
                disabled={adding}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg"
              >
                {adding ? "Adding..." : "Add"}
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : repos.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No repos yet</div>
        ) : (
          <div className="grid gap-3">
            {repos.map((repo) => (
              <div
                key={repo._id}
                onClick={() => navigate(`/dashboard/${repo._id}`)}
                className="p-4 bg-[#111111] border border-[#1f1f1f] rounded-xl cursor-pointer"
              >
                <p className="text-white">{repo.name}</p>
                <p className="text-gray-500 text-sm">{repo.owner}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
