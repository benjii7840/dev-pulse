import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../types/index.js";

// This combines IUser with Mongoose's Document type
export interface IUserDocument extends Omit<IUser, "_id">, Document {}

const userSchema = new Schema<IUserDocument>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: false,
  },
  githubId: {
    type: String,
    sparse: true,
  },
  githubUsername: {
    type: String,
  },
  githubToken: {
    type: String,
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model<IUserDocument>("User", userSchema);

export default User;
