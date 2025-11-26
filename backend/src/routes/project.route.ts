import { Router } from "express";
import {
  createProjectController,
  deleteProjectController,
  getAllProjectsInWorkspaceController,
  getProjectAnalyticsController,
  getProjectByIdAndWorkspaceIdController,
  updateProjectController,
} from "../controllers/project.controller";

const projectRoutes = Router();

/**
 * Create a new project within a workspace.
 */
projectRoutes.post("/workspace/:workspaceId/create", createProjectController);

/**
 * Update an existing project within a workspace.
 */
projectRoutes.put(
  "/:id/workspace/:workspaceId/update",
  updateProjectController
);


/**
 * Delete a project from a workspace.
 */
projectRoutes.delete(
  "/:id/workspace/:workspaceId/delete",
  deleteProjectController
);

/**
 * Retrieve all projects in a workspace.
 */
projectRoutes.get(
  "/workspace/:workspaceId/all",
  getAllProjectsInWorkspaceController
);

/**
 * Get analytics for a specific project in a workspace.
 */
projectRoutes.get(
  "/:id/workspace/:workspaceId/analytics",
  getProjectAnalyticsController
);

/**
 * Fetch a specific project by project ID and workspace ID.
 */
projectRoutes.get(
  "/:id/workspace/:workspaceId",
  getProjectByIdAndWorkspaceIdController
);

export default projectRoutes;
