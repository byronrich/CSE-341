import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

let db;

export const connectDB = async () => {
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas as alexmongo");

    // Match your database name in Atlas
    db = client.db("cse341");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
};
