import express, { Request, Response } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware.js";

const router = express.Router();

// Step 1 — Redirect user to GitHub
router.get("/auth", (req: Request, res: Response) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=repo,user`;
  res.redirect(githubAuthUrl);
});

// Step 2 — GitHub redirects back here with a code
router.get("/callback", async (req: Request, res: Response) => {
  const { code } = req.query;

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      { headers: { Accept: "application/json" } },
    );

    const githubToken = tokenResponse.data.access_token;

    // Fetch GitHub user profile
    const profileResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${githubToken}` },
    });

    const githubProfile = profileResponse.data;

    // Find or create user
    let user = await User.findOne({ githubId: githubProfile.id.toString() });

    if (!user) {
      // Check if user exists with same email
      user = await User.findOne({ email: githubProfile.email });

      if (user) {
        // Link GitHub to existing account
        user.githubId = githubProfile.id.toString();
        user.githubToken = githubToken;
        user.githubUsername = githubProfile.login;
        user.avatar = githubProfile.avatar_url;
        await user.save();
      } else {
        // Create new user
        user = await User.create({
          name: githubProfile.name || githubProfile.login,
          email: githubProfile.email || `${githubProfile.login}@github.com`,
          githubId: githubProfile.id.toString(),
          githubToken,
          githubUsername: githubProfile.login,
          avatar: githubProfile.avatar_url,
        });
      }
    } else {
      // Update token
      user.githubToken = githubToken;
      await user.save();
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  } catch (error) {
    console.error("GitHub OAuth error:", error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=github_auth_failed`);
  }
});

// Get user's GitHub repos
router.get(
  "/repos",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const user = await User.findById(req.user._id);

      if (!user?.githubToken) {
        res.status(400).json({ message: "GitHub not connected" });
        return;
      }

      const reposResponse = await axios.get(
        "https://api.github.com/user/repos?sort=updated&per_page=50",
        { headers: { Authorization: `Bearer ${user.githubToken}` } },
      );

      const repos = reposResponse.data.map((repo: any) => ({
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
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch repos" });
    }
  },
);

export default router;
