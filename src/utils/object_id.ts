import { Types } from "mongoose";

export const ObjectId = (id: string) =>
  typeof id === "string" ? Types.ObjectId.createFromHexString(id) : id;
