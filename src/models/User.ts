import mongoose, { ObjectId, Schema } from "mongoose";

export interface IUser extends Document {
  roleId: ObjectId;
  name: string;
  dialCode: number;
  mobile: number;
  email: string;
  password: string;
  isActive: boolean;
  createdBy: ObjectId;
  updatedBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    roleId: { type: Object, required: true },
    name: { type: String, required: true },
    dialCode: { type: Number, required: true },
    mobile: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    createdBy: { type: Object, default: null },
    updatedBy: { type: Object, default: null },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
