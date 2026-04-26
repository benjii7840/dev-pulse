import express, {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/register",
  async (req: ExpressRequest, res: ExpressResponse): Promise<void> => {
    const { name, email, password, accountType } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        accountType: accountType || "individual",
      });
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" },
      );
      res.status(201).json({ token, accountType: user.accountType });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

router.post(
  "/login",
  async (req: ExpressRequest, res: ExpressResponse): Promise<void> => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
      }
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" },
      );
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

router.get(
  "/me",
  authMiddleware,
  async (req: AuthRequest, res: ExpressResponse): Promise<void> => {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    res.json(req.user);
  },
);

export default router;
