import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');
dotenv.config();

const uri = process.env.MONGODB_URI;
console.log('Running simple diagnostics...');

async function test() {
  try {
    const client = new MongoClient(uri!, { serverSelectionTimeoutMS: 5000 }); // Fail fast in 5s
    await client.connect();
    console.log('SUCCESS: Connected to Atlas!');
    await client.close();
  } catch (err: any) {
    console.log('FAILURE ERROR NAME:', err.name);
    console.log('FAILURE ERROR MESSAGE:', err.message);
  }
}
test();
