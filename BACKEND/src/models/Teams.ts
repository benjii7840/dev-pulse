import mongoose, { Document, Schema } from "mongoose";
import { ITeam } from "../types/index.js";
import crypto from "crypto";

export interface ITeamDocument extends ITeam, Document {}

const teamSchema = new Schema<ITeamDocument>({
  name: { type: String, required: true, trim: true },
  ownerId: { type: String, required: true },
  members: [{ type: String }],
  repos: [{ type: String }],
  inviteCode: {
    type: String,
    default: () => crypto.randomBytes(4).toString("hex").toUpperCase(),
    unique: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Team = mongoose.model<ITeamDocument>("Team", teamSchema);
export default Team;