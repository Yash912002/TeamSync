import { Router } from "express";
import { getCurrentUserController } from "../controllers/user.controller";

const userRoutes = Router();

/**
 * Retrieve details of the currently authenticated user.
 */
userRoutes.get("/current", getCurrentUserController);

export default userRoutes;
