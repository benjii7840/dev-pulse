import express, { Response } from "express";
import axios from "axios";
import Repository from "../models/Repository";
import User from "../models/User";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";

const router = express.Router();

// GET all tracked repos for this user
router.get(
  "/",
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const repos = await Repository.find({ userId: req.user._id });
      res.json(repos);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

// POST add a repo to track
router.post(
  "/",
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    const { owner, name } = req.body;

    try {
      const user = await User.findById(req.user._id);

      if (!user?.githubToken) {
        res.status(400).json({ message: "Connect GitHub first" });
        return;
      }

      // Fetch repo details from GitHub
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${name}`,
        { headers: { Authorization: `Bearer ${user.githubToken}` } },
      );

      const githubRepo = response.data;

      // Check if already tracking
      const existing = await Repository.findOne({
        userId: req.user._id,
        githubId: githubRepo.id,
      });

      if (existing) {
        res.status(400).json({ message: "Already tracking this repo" });
        return;
      }

      // Save to database
      const repo = await Repository.create({
        userId: req.user._id,
        name: githubRepo.name,
        owner: githubRepo.owner.login,
        fullName: githubRepo.full_name,
        description: githubRepo.description,
        url: githubRepo.html_url,
        githubId: githubRepo.id,
      });

      res.status(201).json(repo);
    } catch (error) {
      res.status(500).json({ message: "Failed to add repo" });
    }
  },
);

// DELETE remove a tracked repo
router.delete(
  "/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const repo = await Repository.findOneAndDelete({
        _id: req.params.id,
        userId: req.user._id,
      });

      if (!repo) {
        res.status(404).json({ message: "Repo not found" });
        return;
      }

      res.json({ message: "Repo removed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

export default router;
