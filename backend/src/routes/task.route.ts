import { Router } from "express";
import {
	createTaskController,
	deleteTaskController,
	getAllTasksController,
	getTaskByIdController,
	updateTaskController,
} from "../controllers/task.controller";

const taskRoutes = Router();

/**
 * Create a task for a specific project and workspace.
 */
taskRoutes.post(
	"/project/:projectId/workspace/:workspaceId/create",
	createTaskController
);

/**
 * Delete a task within a workspace.
 */
taskRoutes.delete("/:id/workspace/:workspaceId/delete", deleteTaskController);

/**
 * Update a task associated with a specific project and workspace.
 */
taskRoutes.put(
	"/:id/project/:projectId/workspace/:workspaceId/update",
	updateTaskController
);

/**
 * Retrieve all tasks within a workspace.
 */
taskRoutes.get("/workspace/:workspaceId/all", getAllTasksController);

/**
 * Fetch a specific task by ID, project ID, and workspace ID.
 */
taskRoutes.get(
	"/:id/project/:projectId/workspace/:workspaceId",
	getTaskByIdController
);

export default taskRoutes;
