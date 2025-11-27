import mongoose, { Document, Schema } from "mongoose";
import { generateInviteCode } from "../utils/uuid";

/** Mongoose document structure for a workspace. */
export interface WorkspaceDocument extends Document {
	name: string;
	description: string;
	owner: mongoose.Types.ObjectId;
	inviteCode: string;
	createdAt: string;
	updatedAt: string;
}

/** Workspace schema defining metadata, owner reference, and invite code generation. */
const workspaceSchema = new Schema<WorkspaceDocument>(
	{
		name: { type: String, required: true, trim: true },
		description: { type: String, required: false },
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User", // workspace creator
			required: true,
		},
		inviteCode: {
			type: String,
			required: true,
			unique: true,
			default: generateInviteCode,
		},
	},
	{
		timestamps: true,
	}
);

/** Regenerates and assigns a new invite code for the workspace. */
workspaceSchema.methods.resetInviteCode = function () {
	this.inviteCode = generateInviteCode();
};

const WorkspaceModel = mongoose.model<WorkspaceDocument>(
	"Workspace",
	workspaceSchema
);

export default WorkspaceModel;
