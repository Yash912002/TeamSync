import { NextFunction, Request, Response } from "express";

type AyncControllerType = (
	req: Request,
	res: Response,
	next: NextFunction
) => Promise<void>;

/**
 * Wraps an async controller function and automatically catches errors.
 * Any error caught will be forwarded to the next() middleware (error handler).
 *
 * @param controller - The async controller function to wrap
 * @returns A new function that handles errors for the given controller
 */
export const asyncHandler = (
	controller: AyncControllerType
): AyncControllerType => {
	return async (req, res, next) => {
		try {
			await controller(req, res, next);
		} catch (error) {
			next(error);
		}
	};
};
