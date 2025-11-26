import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../utils/appError";

/**
 * Middleware that verifies a user is authenticated.
 * Checks if `req.user` and its `_id` exist.
 * Throws `UnauthorizedException` if the user is not logged in.
 *
 * @param {Request} req - Express request object
 * @param {Response} _res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {UnauthorizedException} When the user is not authenticated
 */
const isAuthenticated = (
	req: Request,
	_res: Response,
	next: NextFunction
): void => {
	if (!req.user || !req.user._id) {
		throw new UnauthorizedException("Unauthorized. Please log in.");
	}
	next();
};

export default isAuthenticated;
