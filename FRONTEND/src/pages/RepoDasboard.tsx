import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { api } from "../utils/api";
import { DashboardData } from "../types";

const RepoDashboard = () => {
  const { repoId } = useParams<{ repoId: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!repoId) return;
    api
      .get<DashboardData>(`/api/dashboard/${repoId}`)
      .then(setData)
      .catch(() => navigate("/dashboard"))
      .finally(() => setLoading(false));
  }, [repoId]);

  if (loading)
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );

  if (!data) return null;

  return (
    <Layout>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-600 hover:text-white text-sm transition"
          >
            ←
          </button>
          <div>
            <h1 className="text-white font-semibold">{data.repo.name}</h1>
            <a
              href={data.repo.url}
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 text-xs hover:text-blue-400 transition"
            >
              {data.repo.fullName} ↗
            </a>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            {
              label: "Commits",
              value: data.stats.totalCommits,
              color: "text-white",
            },
            {
              label: "Open PRs",
              value: data.stats.openPRs,
              color: "text-yellow-400",
            },
            {
              label: "Issues",
              value: data.stats.openIssues,
              color: "text-red-400",
            },
            {
              label: "Contributors",
              value: data.stats.contributors,
              color: "text-blue-400",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-4"
            >
              <p className="text-gray-600 text-xs mb-1">{stat.label}</p>
              <p className={`text-2xl font-semibold ${stat.color}`}>
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
            {data.commits.map((commit) => (
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
            <p className="text-white text-xs font-medium mb-3">Contributors</p>
            {data.contributors.map((c) => (
              <div key={c.username} className="flex items-center gap-2 mb-3">
                <img src={c.avatar} className="w-6 h-6 rounded-full" alt="" />
                <div className="flex-1">
                  <p className="text-gray-300 text-xs">{c.username}</p>
                  <div className="w-full h-1 bg-[#1f1f1f] rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{
                        width: `${Math.min((c.contributions / data.contributors[0].contributions) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="text-gray-700 text-xs">{c.contributions}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RepoDashboard;
