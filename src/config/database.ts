import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const mongoURI = process.env.MONGO_URI;

const connect = async () => {
  try {
    if (!mongoURI) {
      throw {
        status: 500,
        message: "Mongo URI is not configured!",
      };
    }
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connect;
