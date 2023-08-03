import { MongoClient } from "mongodb";
import AWS from "aws-sdk";

async function getMongoConnectionString() {
  const secretManager = new AWS.SecretsManager();

  try {
    const data = await secretManager.getSecretValue({ SecretId: secretName }).promise();
    const secret = JSON.parse(data.SecretString);
    return secret.mongoConnectionString;
  } catch (err) {
    console.error("Failed to retreive connection string");
    throw err;
  }
}

export default async function getClient() {
  const uri = await getMongoConnectionString();
  const client = new MongoClient(uri);
  return client;
}
