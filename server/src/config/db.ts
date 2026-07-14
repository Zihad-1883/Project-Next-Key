import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';
import dns from 'dns';

// Force DNS resolution order on Windows to resolve Atlas SRV entries correctly
dns.setDefaultResultOrder('ipv4first');

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Database configuration error: MONGODB_URI environment variable is missing.');
}

let client: MongoClient | null = null;
let dbInstance: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (dbInstance && client) {
    return dbInstance;
  }

  try {
    console.log('Connecting to MongoDB Atlas...');
    client = new MongoClient(uri as string);
    await client.connect();
    
    // Determine the database name from URI, or default to 'nextkey'
    dbInstance = client.db('nextkey');
    
    console.log('Successfully connected to MongoDB Atlas!');
    return dbInstance;
  } catch (error) {
    console.error('Failed to connect to MongoDB Atlas:', error);
    throw error;
  }
}

export async function getDb(): Promise<Db> {
  if (!dbInstance) {
    return await connectToDatabase();
  }
  return dbInstance;
}

export async function closeDatabaseConnection(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    dbInstance = null;
    console.log('MongoDB connection closed.');
  }
}
