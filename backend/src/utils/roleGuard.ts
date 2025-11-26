import { PermissionType } from "../enums/role.enum";
import { UnauthorizedException } from "./appError";
import { RolePermissions } from "./role-permission";

/**
 * Validates whether a given role has all required permissions.
 *
 * @param role - Role to check against the permission map.
 * @param requiredPermissions - List of permissions that must be granted.
 * @throws UnauthorizedException when required permissions are not satisfied.
 */
export const roleGuard = (
	role: keyof typeof RolePermissions,
	requiredPermissions: PermissionType[]
) => {
	const permissions = RolePermissions[role];
	// If the role doesn't exist or lacks required permissions, throw an exception

	const hasPermission = requiredPermissions.every((permission) =>
		permissions.includes(permission)
	);

	if (!hasPermission) {
		throw new UnauthorizedException(
			"You do not have the necessary permissions to perform this action"
		);
	}
};
