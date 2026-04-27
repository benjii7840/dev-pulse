import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { api } from "../utils/api";
import { Team, Repo, DashboardData } from "../types";

const TeamDashboard = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const [team, setTeam] = useState<Team | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [activity, setActivity] = useState<DashboardData | null>(null);
  const [activityLoading, setActivityLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showInvite, setShowInvite] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!teamId) return;
    Promise.all([
      api.get<Team>(`/api/teams/${teamId}`),
      api.get<Repo[]>("/api/repos"),
    ])
      .then(([teamData, repoData]) => {
        setTeam(teamData);
        setRepos(repoData);
        if (repoData.length > 0) loadActivity(repoData[0]);
      })
      .finally(() => setLoading(false));
  }, [teamId]);

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

  const copyInviteCode = () => {
    if (team) {
      navigator.clipboard.writeText(team.inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading)
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="flex h-screen">
        {/* Left panel */}
        <div className="w-64 border-r border-[#1f1f1f] flex flex-col h-full">
          <div className="p-4 border-b border-[#1f1f1f]">
            <div className="flex items-center justify-between mb-1">
              <p className="text-white text-sm font-medium">{team?.name}</p>
              <button
                onClick={() => setShowInvite(!showInvite)}
                className="text-gray-600 hover:text-white text-xs transition"
                title="Invite members"
              >
                +
              </button>
            </div>
            <p className="text-gray-700 text-xs">
              {team?.members.length} members
            </p>

            {showInvite && (
              <div className="mt-3 p-3 bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg">
                <p className="text-gray-600 text-xs mb-2">Invite code</p>
                <div className="flex items-center gap-2">
                  <span className="text-white font-mono text-sm flex-1">
                    {team?.inviteCode}
                  </span>
                  <button
                    onClick={copyInviteCode}
                    className="text-blue-400 hover:text-blue-300 text-xs transition"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            <p className="text-gray-700 text-xs px-2 mb-2 uppercase tracking-wider">
              Repositories
            </p>
            {repos.length === 0 ? (
              <p className="text-gray-700 text-xs text-center py-4">
                No repos added yet
              </p>
            ) : (
              repos.map((repo) => (
                <div
                  key={repo._id}
                  onClick={() => loadActivity(repo)}
                  className={`px-3 py-2 rounded-lg cursor-pointer transition mb-0.5 ${
                    selectedRepo?._id === repo._id
                      ? "bg-[#1f1f1f] text-white"
                      : "text-gray-600 hover:text-white hover:bg-[#1a1a1a]"
                  }`}
                >
                  <p className="text-xs font-medium truncate">{repo.name}</p>
                  <p className="text-gray-700 text-xs">{repo.owner}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right — Activity */}
        <div className="flex-1 overflow-y-auto">
          {!selectedRepo ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-600 text-sm">
                Select a repository to view activity
              </p>
            </div>
          ) : activityLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : activity ? (
            <div className="p-6">
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

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-4">
                  <p className="text-white text-xs font-medium mb-3">
                    Recent Commits
                  </p>
                  {activity.commits.map((commit) => (
                    <a
                      key={commit.sha}
                      href={commit.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-start gap-2 hover:bg-[#1a1a1a] p-1.5 rounded-lg transition group mb-1"
                    >
                      <span className="text-gray-700 font-mono text-xs shrink-0">
                        {commit.sha}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-400 text-xs truncate group-hover:text-white">
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

                <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-4">
                  <p className="text-white text-xs font-medium mb-3">
                    Team Contributors
                  </p>
                  {activity.contributors.map((c) => (
                    <div
                      key={c.username}
                      className="flex items-center gap-2 mb-3"
                    >
                      <img
                        src={c.avatar}
                        className="w-6 h-6 rounded-full"
                        alt=""
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-300 text-xs">{c.username}</p>
                        <div className="w-full h-1 bg-[#1f1f1f] rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-full bg-purple-600 rounded-full"
                            style={{
                              width: `${Math.min((c.contributions / activity.contributors[0].contributions) * 100, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                      <span className="text-gray-700 text-xs">
                        {c.contributions}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default TeamDashboard;
