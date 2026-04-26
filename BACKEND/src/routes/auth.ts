import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import authMiddleware, { AuthRequest } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", async (req: Request, res: Response): Promise<void> => {
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
      { expiresIn: "7d" }
    );
    res.status(201).json({ token, accountType: user.accountType });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req: AuthRequest, res: express.Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.get(
  "/me",
  authMiddleware,
  async (req: AuthRequest, res: express.Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.json(req.user);
  },
);

export default router;
