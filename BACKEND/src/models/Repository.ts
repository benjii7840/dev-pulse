import mongoose, { Document, Schema } from "mongoose";
import { IRepository } from "../types/index.js";

export interface IRepositoryDocument extends IRepository, Document {
  githubId: number;
}

const repositorySchema = new Schema<IRepositoryDocument>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  owner: { type: String, required: true },
  fullName: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  githubId: { type: Number, required: true },
});

export default mongoose.model<IRepositoryDocument>(
  "Repository",
  repositorySchema,
);
