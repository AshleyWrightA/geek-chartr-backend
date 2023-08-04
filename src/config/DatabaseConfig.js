import { MongoClient } from "mongodb";

export default function getClient() {
  const uri = process.env.MONGO_CONNECTION_STRING;
  const client = new MongoClient(uri);
  return client;
}
