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
// GET all tracked repos for this user
router.get("/", authMiddleware_1.default, async (req, res) => {
    try {
        const repos = await Repository_1.default.find({ userId: req.user._id });
        res.json(repos);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
// POST add a repo to track
router.post("/", authMiddleware_1.default, async (req, res) => {
    const { owner, name } = req.body;
    try {
        const user = await User_1.default.findById(req.user._id);
        if (!user?.githubToken) {
            res.status(400).json({ message: "Connect GitHub first" });
            return;
        }
        // Fetch repo details from GitHub
        const response = await axios_1.default.get(`https://api.github.com/repos/${owner}/${name}`, { headers: { Authorization: `Bearer ${user.githubToken}` } });
        const githubRepo = response.data;
        // Check if already tracking
        const existing = await Repository_1.default.findOne({
            userId: req.user._id,
            githubId: githubRepo.id,
        });
        if (existing) {
            res.status(400).json({ message: "Already tracking this repo" });
            return;
        }
        // Save to database
        const repo = await Repository_1.default.create({
            userId: req.user._id,
            name: githubRepo.name,
            owner: githubRepo.owner.login,
            fullName: githubRepo.full_name,
            description: githubRepo.description,
            url: githubRepo.html_url,
            githubId: githubRepo.id,
        });
        res.status(201).json(repo);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to add repo" });
    }
});
// DELETE remove a tracked repo
router.delete("/:id", authMiddleware_1.default, async (req, res) => {
    try {
        const repo = await Repository_1.default.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });
        if (!repo) {
            res.status(404).json({ message: "Repo not found" });
            return;
        }
        res.json({ message: "Repo removed successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = router;
