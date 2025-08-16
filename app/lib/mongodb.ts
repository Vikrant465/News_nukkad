import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

const options = {};

// Global variable for caching the client across hot reloads in dev
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Extend Node's global type so TypeScript doesn’t complain
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
