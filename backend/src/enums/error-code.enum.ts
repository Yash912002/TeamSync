/**
 * Enum object containing all possible application error codes.
 * Each key is also the value to ensure consistent usage across the codebase.
 */
export const ErrorCodeEnum = {
	// Authentication Errors
	AUTH_EMAIL_ALREADY_EXISTS: "AUTH_EMAIL_ALREADY_EXISTS",
	AUTH_INVALID_TOKEN: "AUTH_INVALID_TOKEN",
	AUTH_USER_NOT_FOUND: "AUTH_USER_NOT_FOUND",
	AUTH_NOT_FOUND: "AUTH_NOT_FOUND",
	AUTH_TOO_MANY_ATTEMPTS: "AUTH_TOO_MANY_ATTEMPTS",
	AUTH_UNAUTHORIZED_ACCESS: "AUTH_UNAUTHORIZED_ACCESS",
	AUTH_TOKEN_NOT_FOUND: "AUTH_TOKEN_NOT_FOUND",

	// Access Control Errors
	ACCESS_UNAUTHORIZED: "ACCESS_UNAUTHORIZED",

	BAD_REQUEST: "BAD_REQUEST",

	// Validation and Resource Errors
	VALIDATION_ERROR: "VALIDATION_ERROR",
	RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND",

	// System Errors
	INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;

/**
 * Type representing all valid keys of the ErrorCodeEnum.
 */
export type ErrorCodeEnumType = keyof typeof ErrorCodeEnum;
