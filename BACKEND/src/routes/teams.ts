import express, { Response } from "express";
import Team from "../models/Teams";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";

const router = express.Router();

// Create a team
router.post(
  "/",
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    const { name } = req.body;
    try {
      const team = await Team.create({
        name,
        ownerId: req.user._id.toString(),
        members: [req.user._id.toString()],
      });
      res.status(201).json(team);
    } catch (error) {
      res.status(500).json({ message: "Failed to create team" });
    }
  },
);

// Get my teams
router.get(
  "/",
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const teams = await Team.find({
        members: req.user._id.toString(),
      });
      res.json(teams);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch teams" });
    }
  },
);

// Join a team with invite code
router.post(
  "/join",
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    const { inviteCode } = req.body;
    try {
      const team = await Team.findOne({ inviteCode });
      if (!team) {
        res.status(404).json({ message: "Invalid invite code" });
        return;
      }

      if (team.members.includes(req.user._id.toString())) {
        res.status(400).json({ message: "Already a member" });
        return;
      }

      team.members.push(req.user._id.toString());
      await team.save();
      res.json(team);
    } catch (error) {
      res.status(500).json({ message: "Failed to join team" });
    }
  },
);

// Get team details
router.get(
  "/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const team = await Team.findById(req.params.id);
      if (!team) {
        res.status(404).json({ message: "Team not found" });
        return;
      }
      if (!team.members.includes(req.user._id.toString())) {
        res.status(403).json({ message: "Not a member" });
        return;
      }
      res.json(team);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch team" });
    }
  },
);

// Add repo to team
router.post(
  "/:id/repos",
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    const { repoId } = req.body;
    try {
      const team = await Team.findById(req.params.id);
      if (!team) {
        res.status(404).json({ message: "Team not found" });
        return;
      }
      if (team.ownerId !== req.user._id.toString()) {
        res.status(403).json({ message: "Only owner can add repos" });
        return;
      }
      if (!team.repos.includes(repoId)) {
        team.repos.push(repoId);
        await team.save();
      }
      res.json(team);
    } catch (error) {
      res.status(500).json({ message: "Failed to add repo to team" });
    }
  },
);

export default router;
