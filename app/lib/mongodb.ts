import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}
const options = {};
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}
const client = new MongoClient(uri, options);
const clientPromise =
  global._mongoClientPromise || client.connect();

if (process.env.NODE_ENV !== "production") {
  global._mongoClientPromise = clientPromise;
}

export default clientPromise;