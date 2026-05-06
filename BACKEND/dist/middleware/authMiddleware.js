"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = await User_1.default.findById(decoded.id).select("-password");
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
const authMiddleware2 = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Auth header:", authHeader);
    const token = authHeader?.split(" ")[1];
    console.log("Token:", token);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
};
exports.default = authMiddleware;
