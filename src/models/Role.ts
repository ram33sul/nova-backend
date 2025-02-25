import mongoose, { ObjectId, Schema } from "mongoose";
import { RoleName } from "../types/role";

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
