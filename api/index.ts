import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../src/app";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "no-mongo-uri";

// Connect to MongoDB once (cached for serverless)
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(MONGO_URI);
  isConnected = true;
  console.log("Connected to MongoDB");
};

// Export handler for Vercel serverless
export default async function handler(req: any, res: any) {
  await connectDB();
  return app(req, res);
}
