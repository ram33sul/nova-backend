import mongoose, { ObjectId, Schema } from "mongoose";
import { KycStatus } from "../types/kyc";

interface IKyc extends Document {
  userId: ObjectId;
  name: string;
  dialCode: string;
  mobile: string;
  urlId: ObjectId;
  status: KycStatus;
  isActive: boolean;
  createdBy: ObjectId;
  updatedBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const KycShcema = new Schema<IKyc>(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dialCode: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    urlId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.keys(KycStatus),
      default: KycStatus.PENDING,
    },
    isActive: { type: Boolean, default: true },
    createdBy: { type: Object, default: null },
    updatedBy: { type: Object, default: null },
  },
  {
    timestamps: true,
  }
);

const Kyc = mongoose.model<IKyc>("Kyc", KycShcema);
export default Kyc;
