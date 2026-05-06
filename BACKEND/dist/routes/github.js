"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
// Step 1 — Redirect user to GitHub
router.get("/auth", (req, res) => {
    const githubClientId = process.env.GITHUB_CLIENT_ID?.trim();
    const githubClientSecret = process.env.GITHUB_CLIENT_SECRET?.trim();
    const frontendUrl = (process.env.FRONTEND_URL || "http://localhost:5173")
        .trim()
        .replace(/\/$/, "");
    const redirectUri = `${frontendUrl}/auth/callback`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&scope=repo,user&redirect_uri=${encodeURIComponent(redirectUri)}`;
    if (!githubClientId || !githubClientSecret) {
        console.error("GitHub OAuth env variables are missing or malformed.");
        res.status(500).send("GitHub OAuth is not configured correctly.");
        return;
    }
    res.redirect(githubAuthUrl);
});
// Step 2 — GitHub redirects back here with a code
router.get("/callback", async (req, res) => {
    const { code } = req.query;
    try {
        const tokenResponse = await axios_1.default.post("https://github.com/login/oauth/access_token", {
            client_id: process.env.GITHUB_CLIENT_ID?.trim(),
            client_secret: process.env.GITHUB_CLIENT_SECRET?.trim(),
            code,
        }, { headers: { Accept: "application/json" } });
        const githubToken = tokenResponse.data.access_token;
        const profileResponse = await axios_1.default.get("https://api.github.com/user", {
            headers: { Authorization: `Bearer ${githubToken}` },
        });
        const githubProfile = profileResponse.data;
        let user = await User_1.default.findOne({ githubId: githubProfile.id.toString() });
        if (!user) {
            user = await User_1.default.findOne({ email: githubProfile.email });
            if (user) {
                user.githubId = githubProfile.id.toString();
                user.githubToken = githubToken;
                user.githubUsername = githubProfile.login;
                user.avatar = githubProfile.avatar_url;
                await user.save();
            }
            else {
                user = await User_1.default.create({
                    name: githubProfile.name || githubProfile.login,
                    email: githubProfile.email || `${githubProfile.login}@github.com`,
                    githubId: githubProfile.id.toString(),
                    githubToken,
                    githubUsername: githubProfile.login,
                    avatar: githubProfile.avatar_url,
                });
            }
        }
        else {
            user.githubToken = githubToken;
            await user.save();
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        // ✅ FIXED REDIRECT
        const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
        res.redirect(`${FRONTEND_URL}/auth/callback?token=${token}`);
    }
    catch (error) {
        console.error("GitHub OAuth error:", error);
        res.redirect("http://localhost:5173/login?error=github_failed");
    }
});
// Get user's GitHub repos
router.get("/repos", authMiddleware_1.default, async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user._id);
        if (!user?.githubToken) {
            res.status(400).json({ message: "GitHub not connected" });
            return;
        }
        const reposResponse = await axios_1.default.get("https://api.github.com/user/repos?sort=updated&per_page=50", { headers: { Authorization: `Bearer ${user.githubToken}` } });
        const repos = reposResponse.data.map((repo) => ({
            id: repo.id,
            name: repo.name,
            owner: repo.owner.login,
            fullName: repo.full_name,
            description: repo.description,
            url: repo.html_url,
            private: repo.private,
            updatedAt: repo.updated_at,
        }));
        res.json(repos);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch repos" });
    }
});
// Get the user's latest GitHub events
router.get("/events", authMiddleware_1.default, async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user._id);
        if (!user?.githubToken || !user.githubUsername) {
            res.status(400).json({ message: "GitHub not connected" });
            return;
        }
        const eventsResponse = await axios_1.default.get(`https://api.github.com/users/${user.githubUsername}/events?per_page=20`, {
            headers: { Authorization: `Bearer ${user.githubToken}` },
        });
        const events = eventsResponse.data.map((event) => ({
            id: event.id,
            type: event.type,
            repo: event.repo.name,
            action: event.payload.action || null,
            createdAt: event.created_at,
            url: event.repo?.url || null,
        }));
        res.json(events);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch GitHub events" });
    }
});
exports.default = router;
