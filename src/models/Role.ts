import mongoose, { ObjectId, Schema } from "mongoose";

export enum RoleName {
  SYSTEM = "SYSTEM",
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}

interface IRole extends Document {
  name: RoleName;
  isActive: boolean;
  createdBy: ObjectId;
  updatedBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      enum: Object.keys(RoleName),
      required: true,
      unique: true,
    },
    isActive: { type: Boolean, default: true },
    createdBy: { type: Object, default: null },
    updatedBy: { type: Object, default: null },
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model<IRole>("Role", RoleSchema);
export default Role;
