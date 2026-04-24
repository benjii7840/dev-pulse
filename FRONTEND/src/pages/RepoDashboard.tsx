import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { api } from "../utils/api";
import { DashboardData } from "../types";

const RepoDashboard = () => {
  const { repoId } = useParams<{ repoId: string }>();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!repoId) return;
    api
      .get<DashboardData>(`/api/dashboard/${repoId}`)
      .then(setData)
      .catch(() => navigate("/dashboard"))
      .finally(() => setLoading(false));
  }, [repoId]);

  if (loading) return <Layout>Loading...</Layout>;
  if (!data) return null;

  return (
    <Layout>
      <h1 className="text-white text-xl mb-4">{data.repo.name}</h1>

      <a
        href={data.repo.url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-400"
      >
        View on GitHub
      </a>

      <div className="mt-6">
        <p className="text-gray-400">Commits: {data.stats.totalCommits}</p>
        <p className="text-gray-400">PRs: {data.stats.openPRs}</p>
        <p className="text-gray-400">Issues: {data.stats.openIssues}</p>
      </div>
    </Layout>
  );
};

export default RepoDashboard;
