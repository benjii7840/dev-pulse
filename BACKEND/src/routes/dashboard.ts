import express, { Response } from "express";
import axios from "axios";
import Repository from "../models/Repository";
import User from "../models/User";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";

const router = express.Router();

router.get(
  "/:repoId",
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const repo = await Repository.findOne({
        _id: req.params.repoId,
        userId: req.user._id,
      });

      if (!repo) {
        res.status(404).json({ message: "Repo not found" });
        return;
      }

      const user = await User.findById(req.user._id);
      const headers = { Authorization: `Bearer ${user?.githubToken}` };
      const baseUrl = `https://api.github.com/repos/${repo.owner}/${repo.name}`;

      // Fetch all data in parallel
      const [commitsRes, prsRes, issuesRes, contributorsRes] =
        await Promise.all([
          axios.get(`${baseUrl}/commits?per_page=10`, { headers }),
          axios.get(`${baseUrl}/pulls?state=open&per_page=10`, { headers }),
          axios.get(`${baseUrl}/issues?state=open&per_page=10`, { headers }),
          axios.get(`${baseUrl}/contributors?per_page=10`, { headers }),
        ]);

      const commits = commitsRes.data.map((c: any) => ({
        sha: c.sha.substring(0, 7),
        message: c.commit.message.split("\n")[0],
        author: c.commit.author.name,
        date: c.commit.author.date,
        url: c.html_url,
      }));

      const pullRequests = prsRes.data.map((pr: any) => ({
        id: pr.number,
        title: pr.title,
        state: pr.state,
        author: pr.user.login,
        url: pr.html_url,
        createdAt: pr.created_at,
      }));

      const issues = issuesRes.data
        .filter((issue: any) => !issue.pull_request)
        .map((issue: any) => ({
          id: issue.number,
          title: issue.title,
          state: issue.state,
          author: issue.user.login,
          url: issue.html_url,
          createdAt: issue.created_at,
        }));

      const contributors = contributorsRes.data.map((c: any) => ({
        username: c.login,
        avatar: c.avatar_url,
        contributions: c.contributions,
      }));

      res.json({
        repo: {
          name: repo.name,
          fullName: repo.fullName,
          url: repo.url,
        },
        commits,
        pullRequests,
        issues,
        contributors,
        stats: {
          totalCommits: commits.length,
          openPRs: pullRequests.length,
          openIssues: issues.length,
          contributors: contributors.length,
        },
      });
    } catch (error: any) {
      console.error("Dashboard error:", error.message);
      console.error("Full error:", error.response?.data);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  },
);

export default router;
