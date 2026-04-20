import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import authRouter from "./routes/auth";
import githubRouter from "./routes/github";

dotenv.config();

const app: Application = express();
const httpServer = createServer(app);

// Socket.io setup
export const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json({ limit: "10kb" }));

// MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "DevPulse API running" });
});

app.use("/api/auth", authRouter);
app.use("/api/github", githubRouter);

// Socket connection
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5003;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
