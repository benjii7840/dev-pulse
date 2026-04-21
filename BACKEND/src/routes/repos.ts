import express, { Request, Response } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../models/User";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";

const router = express.Router();

export default router;
