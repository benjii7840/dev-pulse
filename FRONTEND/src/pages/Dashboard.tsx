import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { api } from "../utils/api";
import { Repo, DashboardData } from "../types";

const Dashboard = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [activity, setActivity] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activityLoading, setActivityLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [owner, setOwner] = useState("");
  const [name, setName] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5003";

  useEffect(() => {
    api
      .get<Repo[]>("/api/repos")
      .then((data) => {
        setRepos(data);
        if (data.length > 0) loadActivity(data[0]);
      })
      .finally(() => setLoading(false));
  }, []);

  const loadActivity = async (repo: Repo) => {
    setSelectedRepo(repo);
    setActivityLoading(true);
    try {
      const data = await api.get<DashboardData>(`/api/dashboard/${repo._id}`);
      setActivity(data);
    } catch {
      setActivity(null);
    }
    setActivityLoading(false);
  };

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
      loadActivity(repo);
    } catch {
      setError("Failed to add repo. Check owner and name.");
    }
    setAdding(false);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await api.delete(`/api/repos/${id}`);
    const updated = repos.filter((r) => r._id !== id);
    setRepos(updated);
    if (selectedRepo?._id === id) {
      setSelectedRepo(null);
      setActivity(null);
      if (updated.length > 0) loadActivity(updated[0]);
    }
  };

  return (
    <Layout>
      <div className="flex h-screen">
        {/* Left — Repo list */}
        <div className="w-64 border-r border-[#1f1f1f] flex flex-col h-full">
          <div className="p-4 border-b border-[#1f1f1f] flex items-center justify-between">
            <span className="text-white text-sm font-medium">Repositories</span>
            <div className="flex gap-2">
              <a
                href={`${API_URL}/api/github/auth`}
                className="text-gray-600 hover:text-white text-xs transition"
                title="Connect GitHub"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <button
                onClick={() => setShowForm(!showForm)}
                className="text-gray-600 hover:text-white text-xs transition"
                title="Add repo"
              >
                +
              </button>
            </div>
          </div>

          {showForm && (
            <div className="p-3 border-b border-[#1f1f1f]">
              {error && <p className="text-red-400 text-xs mb-2">{error}</p>}
              <input
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                placeholder="Owner"
                className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-1.5 text-white text-xs placeholder-gray-700 focus:outline-none focus:border-blue-500 mb-2"
              />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Repo name"
                className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-1.5 text-white text-xs placeholder-gray-700 focus:outline-none focus:border-blue-500 mb-2"
              />
              <button
                onClick={handleAddRepo}
                disabled={adding}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-1.5 rounded-lg transition disabled:opacity-50"
              >
                {adding ? "Adding..." : "Add"}
              </button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-2">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : repos.length === 0 ? (
              <p className="text-gray-700 text-xs text-center py-8 px-4">
                No repos yet. Add one to get started.
              </p>
            ) : (
              repos.map((repo) => (
                <div
                  key={repo._id}
                  onClick={() => loadActivity(repo)}
                  className={`px-3 py-2 rounded-lg cursor-pointer group transition mb-0.5 ${
                    selectedRepo?._id === repo._id
                      ? "bg-[#1f1f1f] text-white"
                      : "text-gray-600 hover:text-white hover:bg-[#1a1a1a]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium truncate">{repo.name}</p>
                    <button
                      onClick={(e) => handleDelete(repo._id, e)}
                      className="text-gray-700 hover:text-red-400 opacity-0 group-hover:opacity-100 transition text-xs"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-gray-700 text-xs truncate">{repo.owner}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right — Activity */}
        <div className="flex-1 overflow-y-auto">
          {!selectedRepo ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-gray-600 text-sm">Select a repository</p>
                <p className="text-gray-700 text-xs mt-1">
                  to view live activity
                </p>
              </div>
            </div>
          ) : activityLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : activity ? (
            <div className="p-6">
              {/* Repo header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-white font-semibold">
                    {activity.repo.name}
                  </h2>
                  <a
                    href={activity.repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 text-xs hover:text-blue-400 transition"
                  >
                    {activity.repo.fullName} ↗
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-gray-600 text-xs">Live</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {[
                  {
                    label: "Commits",
                    value: activity.stats.totalCommits,
                    color: "text-white",
                  },
                  {
                    label: "Open PRs",
                    value: activity.stats.openPRs,
                    color: "text-yellow-400",
                  },
                  {
                    label: "Issues",
                    value: activity.stats.openIssues,
                    color: "text-red-400",
                  },
                  {
                    label: "Contributors",
                    value: activity.stats.contributors,
                    color: "text-blue-400",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-3"
                  >
                    <p className="text-gray-600 text-xs mb-1">{stat.label}</p>
                    <p className={`text-xl font-semibold ${stat.color}`}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Split content */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Commits */}
                <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-4">
                  <p className="text-white text-xs font-medium mb-3">
                    Recent Commits
                  </p>
                  <div className="flex flex-col gap-2">
                    {activity.commits.map((commit) => (
                      <a
                        key={commit.sha}
                        href={commit.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start gap-2 hover:bg-[#1a1a1a] p-1.5 rounded-lg transition group"
                      >
                        <span className="text-gray-700 font-mono text-xs shrink-0 mt-0.5">
                          {commit.sha}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-400 text-xs truncate group-hover:text-white transition">
                            {commit.message}
                          </p>
                          <p className="text-gray-700 text-xs">
                            {commit.author} ·{" "}
                            {new Date(commit.date).toLocaleDateString()}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Contributors */}
                <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-4">
                  <p className="text-white text-xs font-medium mb-3">
                    Contributors
                  </p>
                  <div className="flex flex-col gap-3">
                    {activity.contributors.map((c) => (
                      <div key={c.username} className="flex items-center gap-2">
                        <img
                          src={c.avatar}
                          className="w-6 h-6 rounded-full"
                          alt=""
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-300 text-xs">{c.username}</p>
                          <div className="w-full h-1 bg-[#1f1f1f] rounded-full mt-1 overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{
                                width: `${Math.min((c.contributions / activity.contributors[0].contributions) * 100, 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                        <span className="text-gray-700 text-xs shrink-0">
                          {c.contributions}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* PRs and Issues */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-4">
                  <p className="text-white text-xs font-medium mb-3">
                    Pull Requests
                    {activity.stats.openPRs > 0 && (
                      <span className="ml-2 text-yellow-400">
                        {activity.stats.openPRs} open
                      </span>
                    )}
                  </p>
                  {activity.pullRequests.length === 0 ? (
                    <p className="text-gray-700 text-xs">
                      No open pull requests
                    </p>
                  ) : (
                    activity.pullRequests.map((pr) => (
                      <a
                        key={pr.id}
                        href={pr.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 hover:bg-[#1a1a1a] p-1.5 rounded-lg transition"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
                        <span className="text-gray-400 text-xs truncate">
                          {pr.title}
                        </span>
                        <span className="text-gray-700 text-xs shrink-0">
                          #{pr.id}
                        </span>
                      </a>
                    ))
                  )}
                </div>

                <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-4">
                  <p className="text-white text-xs font-medium mb-3">
                    Issues
                    {activity.stats.openIssues > 0 && (
                      <span className="ml-2 text-red-400">
                        {activity.stats.openIssues} open
                      </span>
                    )}
                  </p>
                  {activity.issues.length === 0 ? (
                    <p className="text-gray-700 text-xs">No open issues</p>
                  ) : (
                    activity.issues.map((issue) => (
                      <a
                        key={issue.id}
                        href={issue.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 hover:bg-[#1a1a1a] p-1.5 rounded-lg transition"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                        <span className="text-gray-400 text-xs truncate">
                          {issue.title}
                        </span>
                        <span className="text-gray-700 text-xs shrink-0">
                          #{issue.id}
                        </span>
                      </a>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
