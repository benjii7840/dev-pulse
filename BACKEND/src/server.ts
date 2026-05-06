import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import axios from "axios";
import jwt from "jsonwebtoken";
import authRouter from "./routes/auth";
import githubRouter from "./routes/github";
import reposRouter from "./routes/repos";
import dashboardRouter from "./routes/dashboard";
import teamsRouter from "./routes/teams";
import User from "./models/User";
import Repository from "./models/Repository";
import Team from "./models/Teams";

dotenv.config();

const app: Application = express();
const httpServer = createServer(app);

// Socket.io setup
export const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5003",
    methods: ["GET", "POST"],
  },
});

io.use(async (socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) {
    return next(new Error("Unauthorized"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return next(new Error("Unauthorized"));
    }

    socket.data.user = user;
    return next();
  } catch (error) {
    return next(new Error("Unauthorized"));
  }
});

const broadcastRepoUpdate = async (repo: any, updatedAt: string) => {
  const payload = {
    repoId: repo._id.toString(),
    owner: repo.owner,
    name: repo.name,
    fullName: repo.fullName,
    updatedAt,
  };

  io.to(`user:${repo.userId}`).emit("repo:update", payload);

  const teams = await Team.find({ repos: repo._id.toString() });
  teams.forEach((team) => {
    io.to(`team:${team._id}`).emit("repo:update", {
      ...payload,
      teamId: team._id.toString(),
    });
  });
};

const startRepoMonitor = (): void => {
  const intervalMs = parseInt(
    process.env.GITHUB_POLL_INTERVAL_MS || "60000",
    10,
  );

  const pollRepos = async () => {
    try {
      const repos = await Repository.find({});
      for (const repo of repos) {
        const user = await User.findById(repo.userId);
        if (!user?.githubToken) continue;

        try {
          const response = await axios.get(
            `https://api.github.com/repos/${repo.owner}/${repo.name}`,
            {
              headers: {
                Authorization: `Bearer ${user.githubToken}`,
              },
            },
          );

          const githubRepo = response.data;
          const newUpdatedAt = new Date(githubRepo.updated_at).getTime();
          const lastSeen = repo.githubLastUpdatedAt?.getTime() ?? 0;

          if (newUpdatedAt !== lastSeen) {
            repo.githubLastUpdatedAt = new Date(githubRepo.updated_at);
            await repo.save();
            broadcastRepoUpdate(repo, githubRepo.updated_at);
          }
        } catch (error: unknown) {
          console.error(
            `Failed checking repo ${repo.fullName}:`,
            (error as any)?.message ?? error,
          );
        }
      }
    } catch (error) {
      console.error("Failed running GitHub repo monitor:", error);
    }
  };

  pollRepos();
  setInterval(pollRepos, intervalMs);
};

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5003",
    credentials: true,
  }),
);
app.use(express.json({ limit: "10kb" }));

// MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connected");
    startRepoMonitor();
  })
  .catch((err) => console.error("Connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "DevPulse API running" });
});

app.use("/api/auth", authRouter);
app.use("/api/github", githubRouter);
app.use("/api/repos", reposRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/teams", teamsRouter);

// Socket connection
io.on("connection", async (socket) => {
  console.log("Client connected:", socket.id);

  const user = socket.data.user;
  if (user) {
    socket.join(`user:${user._id}`);
    const teams = await Team.find({ members: user._id.toString() });
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
