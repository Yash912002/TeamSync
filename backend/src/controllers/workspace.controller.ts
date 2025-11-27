import { Request, Response } from "express";

import { HTTPSTATUS } from "../config/http.config";
import { Permissions } from "../enums/role.enum";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { getMemberRoleInWorkspace } from "../services/member.service";
import {
	changeMemberRoleService,
	createWorkspaceService,
	deleteWorkspaceService,
	getAllWorkspacesUserIsMemberService,
	getWorkspaceAnalyticsService,
	getWorkspaceByIdService,
	getWorkspaceMembersService,
	updateWorkspaceByIdService,
} from "../services/workspace.service";
import { roleGuard } from "../utils/roleGuard";
import {
	changeRoleSchema,
	createWorkspaceSchema,
	updateWorkspaceSchema,
	workspaceIdSchema,
} from "../validation/workspace.validation";

/**
 * Creates a new workspace for the authenticated user.
 */
export const createWorkspaceController = asyncHandler(
	async (req: Request, res: Response) => {
		const body = createWorkspaceSchema.parse(req.body);

		const userId = req.user?._id;
		const { workspace } = await createWorkspaceService(userId, body);

		return res.status(HTTPSTATUS.CREATED).json({
			message: "Workspace created successfully",
			workspace,
		});
	}
);

/**
 * Fetch all workspaces the authenticated user is a member of.
 */
export const getAllWorkspacesUserIsMemberController = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user?._id;

		const { workspaces } = await getAllWorkspacesUserIsMemberService(userId);

		return res.status(HTTPSTATUS.OK).json({
			message: "User workspaces fetched successfully",
			workspaces,
		});
	}
);

/**
 * Fetch a workspace by ID.
 * Checks if user is a member before fetching.
 */
export const getWorkspaceByIdController = asyncHandler(
	async (req: Request, res: Response) => {
		const workspaceId = workspaceIdSchema.parse(req.params.id);
		const userId = req.user?._id;

		await getMemberRoleInWorkspace(userId, workspaceId);

		const { workspace } = await getWorkspaceByIdService(workspaceId);

		return res.status(HTTPSTATUS.OK).json({
			message: "Workspace fetched successfully",
			workspace,
		});
	}
);

/**
 * Fetch members of a workspace.
 */
export const getWorkspaceMembersController = asyncHandler(
	async (req: Request, res: Response) => {
		const workspaceId = workspaceIdSchema.parse(req.params.id);
		const userId = req.user?._id;

		const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
		roleGuard(role, [Permissions.VIEW_ONLY]);

		const { members, roles } = await getWorkspaceMembersService(workspaceId);

		return res.status(HTTPSTATUS.OK).json({
			message: "Workspace members retrieved successfully",
			members,
			roles,
		});
	}
);

/**
 * Fetch workspace analytics.
 */
export const getWorkspaceAnalyticsController = asyncHandler(
	async (req: Request, res: Response) => {
		const workspaceId = workspaceIdSchema.parse(req.params.id);
		const userId = req.user?._id;

		const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
		roleGuard(role, [Permissions.VIEW_ONLY]);

		const { analytics } = await getWorkspaceAnalyticsService(workspaceId);

		return res.status(HTTPSTATUS.OK).json({
			message: "Workspace analytics retrieved successfully",
			analytics,
		});
	}
);

/**
 * Change a member's role in a workspace.
 * Requires CHANGE_MEMBER_ROLE permission.
 */
export const changeWorkspaceMemberRoleController = asyncHandler(
	async (req: Request, res: Response) => {
		const workspaceId = workspaceIdSchema.parse(req.params.id);
		const { memberId, roleId } = changeRoleSchema.parse(req.body);

		const userId = req.user?._id;

		const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
		roleGuard(role, [Permissions.CHANGE_MEMBER_ROLE]);

		const { member } = await changeMemberRoleService(
			workspaceId,
			memberId,
			roleId
		);

		return res.status(HTTPSTATUS.OK).json({
			message: "Member Role changed successfully",
			member,
		});
	}
);

/**
 * Update a workspace by ID.
 * Requires EDIT_WORKSPACE permission.
 */
export const updateWorkspaceByIdController = asyncHandler(
	async (req: Request, res: Response) => {
		const workspaceId = workspaceIdSchema.parse(req.params.id);
		const { name, description } = updateWorkspaceSchema.parse(req.body);

		const userId = req.user?._id;

		const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
		roleGuard(role, [Permissions.EDIT_WORKSPACE]);

		const { workspace } = await updateWorkspaceByIdService(
			workspaceId,
			name,
			description
		);

		return res.status(HTTPSTATUS.OK).json({
			message: "Workspace updated successfully",
			workspace,
		});
	}
);


/**
 * Delete a workspace by ID.
 * Requires DELETE_WORKSPACE permission.
 */
export const deleteWorkspaceByIdController = asyncHandler(
	async (req: Request, res: Response) => {
		const workspaceId = workspaceIdSchema.parse(req.params.id);

		const userId = req.user?._id;

		const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
		roleGuard(role, [Permissions.DELETE_WORKSPACE]);

		const { currentWorkspace } = await deleteWorkspaceService(
			workspaceId,
			userId
		);

		return res.status(HTTPSTATUS.OK).json({
			message: "Workspace deleted successfully",
			currentWorkspace,
		});
	}
);
