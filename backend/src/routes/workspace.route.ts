import { Router } from "express";
import {
	changeWorkspaceMemberRoleController,
	createWorkspaceController,
	deleteWorkspaceByIdController,
	getAllWorkspacesUserIsMemberController,
	getWorkspaceAnalyticsController,
	getWorkspaceByIdController,
	getWorkspaceMembersController,
	updateWorkspaceByIdController,
} from "../controllers/workspace.controller";

const workspaceRoutes = Router();

/**
 * Create new workspace
 */
workspaceRoutes.post("/create/new", createWorkspaceController);

/**
 * Fetch workspace details by ID.
 */
workspaceRoutes.get("/:id", getWorkspaceByIdController);

/**
 * Update workspace details by workspace ID.
 */
workspaceRoutes.put("/update/:id", updateWorkspaceByIdController);

/**
 * Change the role of a workspace member.
 */
workspaceRoutes.put(
	"/change/member/role/:id",
	changeWorkspaceMemberRoleController
);

/**
 * Delete a workspace by ID.
 */
workspaceRoutes.delete("/delete/:id", deleteWorkspaceByIdController);

/**
 * Get all workspaces where the current user is a member.
 */
workspaceRoutes.get("/all", getAllWorkspacesUserIsMemberController);

/**
 * Retrieve all members of a workspace.
 */
workspaceRoutes.get("/members/:id", getWorkspaceMembersController);

/**
 * Get analytics for a specific workspace.
 */
workspaceRoutes.get("/analytics/:id", getWorkspaceAnalyticsController);

export default workspaceRoutes;
