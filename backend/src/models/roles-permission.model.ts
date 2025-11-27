import mongoose, { Document, Schema } from "mongoose";
import {
  Permissions,
  PermissionType,
  Roles,
  RoleType,
} from "../enums/role.enum";
import { RolePermissions } from "../utils/role-permission";

/**
 * Mongoose document representing a role and its assigned permissions.
 */
export interface RoleDocument extends Document {
	name: RoleType;
	permissions: Array<PermissionType>;
}

const roleSchema = new Schema<RoleDocument>(
	{
		name: {
			type: String,
			enum: Object.values(Roles),
			required: true,
			unique: true,
		},
		permissions: {
			type: [String],
			enum: Object.values(Permissions),
			required: true,
      /**
			 * Assign default permissions based on role type.
			 */
			default: function (this: RoleDocument) {
				return RolePermissions[this.name];
			},
		},
	},
	{
		timestamps: true,
	}
);

const RoleModel = mongoose.model<RoleDocument>("Role", roleSchema);
export default RoleModel;
