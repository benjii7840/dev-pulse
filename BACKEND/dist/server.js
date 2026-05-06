"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("./routes/auth"));
const github_1 = __importDefault(require("./routes/github"));
const repos_1 = __importDefault(require("./routes/repos"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const teams_1 = __importDefault(require("./routes/teams"));
const User_1 = __importDefault(require("./models/User"));
const Repository_1 = __importDefault(require("./models/Repository"));
const Teams_1 = __importDefault(require("./models/Teams"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
// Socket.io setup
exports.io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5003",
        methods: ["GET", "POST"],
    },
});
exports.io.use(async (socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) {
        return next(new Error("Unauthorized"));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await User_1.default.findById(decoded.id).select("-password");
        if (!user) {
            return next(new Error("Unauthorized"));
        }
        socket.data.user = user;
        return next();
    }
    catch (error) {
        return next(new Error("Unauthorized"));
    }
});
const broadcastRepoUpdate = async (repo, updatedAt) => {
    const payload = {
        repoId: repo._id.toString(),
        owner: repo.owner,
        name: repo.name,
        fullName: repo.fullName,
        updatedAt,
    };
    exports.io.to(`user:${repo.userId}`).emit("repo:update", payload);
    const teams = await Teams_1.default.find({ repos: repo._id.toString() });
    teams.forEach((team) => {
        exports.io.to(`team:${team._id}`).emit("repo:update", {
            ...payload,
            teamId: team._id.toString(),
        });
    });
};
const startRepoMonitor = () => {
    const intervalMs = parseInt(process.env.GITHUB_POLL_INTERVAL_MS || "60000", 10);
    const pollRepos = async () => {
        try {
            const repos = await Repository_1.default.find({});
            for (const repo of repos) {
                const user = await User_1.default.findById(repo.userId);
                if (!user?.githubToken)
                    continue;
                try {
                    const response = await axios_1.default.get(`https://api.github.com/repos/${repo.owner}/${repo.name}`, {
                        headers: {
                            Authorization: `Bearer ${user.githubToken}`,
                        },
                    });
                    const githubRepo = response.data;
                    const newUpdatedAt = new Date(githubRepo.updated_at).getTime();
                    const lastSeen = repo.githubLastUpdatedAt?.getTime() ?? 0;
                    if (newUpdatedAt !== lastSeen) {
                        repo.githubLastUpdatedAt = new Date(githubRepo.updated_at);
                        await repo.save();
                        broadcastRepoUpdate(repo, githubRepo.updated_at);
                    }
                }
                catch (error) {
                    console.error(`Failed checking repo ${repo.fullName}:`, error?.message ?? error);
                }
            }
        }
        catch (error) {
            console.error("Failed running GitHub repo monitor:", error);
        }
    };
    pollRepos();
    setInterval(pollRepos, intervalMs);
};
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:5003",
    credentials: true,
}));
app.use(express_1.default.json({ limit: "10kb" }));
// MongoDB
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("MongoDB connected");
    startRepoMonitor();
})
    .catch((err) => console.error("Connection error:", err));
// Test route
app.get("/", (req, res) => {
    res.json({ message: "DevPulse API running" });
});
app.use("/api/auth", auth_1.default);
app.use("/api/github", github_1.default);
app.use("/api/repos", repos_1.default);
app.use("/api/dashboard", dashboard_1.default);
app.use("/api/teams", teams_1.default);
// Socket connection
exports.io.on("connection", async (socket) => {
    console.log("Client connected:", socket.id);
    const user = socket.data.user;
    if (user) {
        socket.join(`user:${user._id}`);
        const teams = await Teams_1.default.find({ members: user._id.toString() });
        teams.forEach((team) => socket.join(`team:${team._id}`));
    }
    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});
const PORT = process.env.PORT || 5003;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
