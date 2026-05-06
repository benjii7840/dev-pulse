"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const Repository_1 = __importDefault(require("../models/Repository"));
const User_1 = __importDefault(require("../models/User"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.get("/:repoId", authMiddleware_1.default, async (req, res) => {
    try {
        const repo = await Repository_1.default.findOne({
            _id: req.params.repoId,
            userId: req.user._id,
        });
        if (!repo) {
            res.status(404).json({ message: "Repo not found" });
            return;
        }
        const user = await User_1.default.findById(req.user._id);
        const headers = { Authorization: `Bearer ${user?.githubToken}` };
        const baseUrl = `https://api.github.com/repos/${repo.owner}/${repo.name}`;
        // Fetch all data in parallel
        const [commitsRes, prsRes, issuesRes, contributorsRes] = await Promise.all([
            axios_1.default.get(`${baseUrl}/commits?per_page=10`, { headers }),
            axios_1.default.get(`${baseUrl}/pulls?state=open&per_page=10`, { headers }),
            axios_1.default.get(`${baseUrl}/issues?state=open&per_page=10`, { headers }),
            axios_1.default.get(`${baseUrl}/contributors?per_page=10`, { headers }),
        ]);
        const commits = commitsRes.data.map((c) => ({
            sha: c.sha.substring(0, 7),
            message: c.commit.message.split("\n")[0],
            author: c.commit.author.name,
            date: c.commit.author.date,
            url: c.html_url,
        }));
        const pullRequests = prsRes.data.map((pr) => ({
            id: pr.number,
            title: pr.title,
            state: pr.state,
            author: pr.user.login,
            url: pr.html_url,
            createdAt: pr.created_at,
        }));
        const issues = issuesRes.data
            .filter((issue) => !issue.pull_request)
            .map((issue) => ({
            id: issue.number,
            title: issue.title,
            state: issue.state,
            author: issue.user.login,
            url: issue.html_url,
            createdAt: issue.created_at,
        }));
        const contributors = contributorsRes.data.map((c) => ({
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
    }
    catch (error) {
        console.error("Dashboard error:", error.message);
        console.error("Full error:", error.response?.data);
        res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
});
exports.default = router;
