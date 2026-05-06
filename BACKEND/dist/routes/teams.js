"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Repository_1 = __importDefault(require("../models/Repository"));
const Teams_1 = __importDefault(require("../models/Teams"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
// Create a team
router.post("/", authMiddleware_1.default, async (req, res) => {
    const { name } = req.body;
    try {
        const team = await Teams_1.default.create({
            name,
            ownerId: req.user._id.toString(),
            members: [req.user._id.toString()],
        });
        res.status(201).json(team);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create team" });
    }
});
// Get my teams
router.get("/", authMiddleware_1.default, async (req, res) => {
    try {
        const teams = await Teams_1.default.find({
            members: req.user._id.toString(),
        });
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch teams" });
    }
});
// Join a team with invite code
router.post("/join", authMiddleware_1.default, async (req, res) => {
    const { inviteCode } = req.body;
    try {
        const team = await Teams_1.default.findOne({ inviteCode });
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
    }
    catch (error) {
        res.status(500).json({ message: "Failed to join team" });
    }
});
// Get team repos
router.get("/:id/repos", authMiddleware_1.default, async (req, res) => {
    try {
        const team = await Teams_1.default.findById(req.params.id);
        if (!team) {
            res.status(404).json({ message: "Team not found" });
            return;
        }
        if (!team.members.includes(req.user._id.toString())) {
            res.status(403).json({ message: "Not a member" });
            return;
        }
        const repos = await Repository_1.default.find({ _id: { $in: team.repos } });
        res.json(repos);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch team repos" });
    }
});
// Get team details
router.get("/:id", authMiddleware_1.default, async (req, res) => {
    try {
        const team = await Teams_1.default.findById(req.params.id);
        if (!team) {
            res.status(404).json({ message: "Team not found" });
            return;
        }
        if (!team.members.includes(req.user._id.toString())) {
            res.status(403).json({ message: "Not a member" });
            return;
        }
        res.json(team);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch team" });
    }
});
// Add repo to team
router.post("/:id/repos", authMiddleware_1.default, async (req, res) => {
    const { repoId } = req.body;
    try {
        const team = await Teams_1.default.findById(req.params.id);
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
    }
    catch (error) {
        res.status(500).json({ message: "Failed to add repo to team" });
    }
});
exports.default = router;
