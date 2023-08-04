import { MongoClient } from "mongodb";

function getMongoURI() {
  try {
    const uri = process.env.MONGODB_CONNECTION_STRING;
    if (!uri) {
      throw new Error("Error fetching environment variable");
    }
    return uri;
  } catch (err) {
    console.log(err);
  }
}

export default function getClient() {
  const uri = getMongoURI();
  let client;
  const options = {
    maxPoolSize: 10,
    maxIdleTimeMS: 25000,
  };

  try {
    client = new MongoClient(uri, options);
  } catch (err) {
    console.log("Error connecting to Mongo Atlas", err);
  }
  return client;
}
