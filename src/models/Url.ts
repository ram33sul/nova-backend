import mongoose, { ObjectId, Schema } from "mongoose";
import { UrlType } from "../types/url";

export interface IUrl extends Document {
  url: string;
  type: UrlType;
  isActive: boolean;
  createdBy: ObjectId;
  updatedBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const UrlSchema = new Schema<IUrl>(
  {
    url: { type: String, required: true },
    type: { type: String, enum: Object.keys(UrlType), required: true },
    isActive: { type: Boolean, default: true },
    createdBy: { type: Object, default: null },
    updatedBy: { type: Object, default: null },
  },
  {
    timestamps: true,
  }
);

const Url = mongoose.model<IUrl>("Url", UrlSchema);
export default Url;
