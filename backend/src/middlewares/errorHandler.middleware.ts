import { ErrorRequestHandler, Response } from "express";
import { z, ZodError } from "zod";
import { HTTPSTATUS } from "../config/http.config";
import { ErrorCodeEnum, ErrorCodeEnumType } from "../enums/error-code.enum";
import { AppError } from "../utils/appError";

interface FormattedZodIssue {
	field: string;
	message: string;
}

interface ValidationErrorResponse {
	message: string;
	errors: FormattedZodIssue[];
	errorCode: ErrorCodeEnumType;
}

/**
 * Formats a Zod validation error into a standardized API error response
 * and sends a 400 Bad Request JSON response.
 *
 * @param {Response} res - Express response object
 * @param {z.ZodError} error - Zod validation error containing detailed issue information.
 * @returns {Response<ValidationErrorResponse>} JSON response with a validation message,
 *          list of field-specific errors, and a validation error code.
 */
const formatZodError = (
	res: Response,
	error: z.ZodError
): Response<ValidationErrorResponse> => {
	const formattedErrors: FormattedZodIssue[] = error.issues.map((issue) => ({
		field: issue.path.join("."),
		message: issue.message,
	}));

	return res.status(HTTPSTATUS.BAD_REQUEST).json({
		message: "Validation failed",
		errors: formattedErrors,
		errorCode: ErrorCodeEnum.VALIDATION_ERROR,
	});
};

export const errorHandler: ErrorRequestHandler = (error, req, res, _next): any => {
	console.error(`Error on ${req.method} ${req.path}`, error);

	// Invalid JSON body
	if (error instanceof SyntaxError) {
		return res.status(HTTPSTATUS.BAD_REQUEST).json({
			message: "Invalid JSON format. Please check your request body.",
			errorCode: ErrorCodeEnum.BAD_REQUEST,
		});
	}

	// Zod validation error
	if (error instanceof ZodError) {
		return formatZodError(res, error);
	}
	
	// Custom application error
	if (error instanceof AppError) {
		return res.status(error.statusCode).json({
			message: error.message,
			errorCode: error.errorCode,
		});
	}

	return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
		message: "Internal Server Error",
		error: error?.message || "Unknow error occurred",
	});
};
