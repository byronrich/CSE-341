import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

let db;

export const connectToDatabase = async () => {
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    db = client.db('cse341'); // your database name
    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
  }
};

export const getDb = () => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
};
