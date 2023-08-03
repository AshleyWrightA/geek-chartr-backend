import getClient from "../config/DatabaseConfig.js";
import { ObjectId } from "mongodb";

export async function fetchPlaysByDate(dates) {
  // Fetches data based on the top five "plays" for each date
  // A "play" contains a date, playCount and boardGame_ref
  // Returns a flattened array containing all the "plays"
  const client = getClient();
  const resultArray = await Promise.all(
    dates.map(async (date) => {
      const play = await client
        .db("bggPlayDB")
        .collection("playCollection")
        .find({ date: date })
        .limit(5)
        .toArray();
      return play;
    })
  );
  return resultArray.flat();
}

export async function fetchOneBoardGameByID(gameId) {
  // Fetch One boardgame name & colour.
  const client = getClient();
  const result = await client
    .db("bggPlayDB")
    .collection("boardGameCollection")
    .findOne({ _id: new ObjectId(gameId) });
  return result;
}

export async function fetchPlayByID(gameId) {
  // Fetch every play document that matches the gameID
  const client = getClient();
  const cursor = await client
    .db("bggPlayDB")
    .collection("playCollection")
    .find({ boardGame_ref: new ObjectId(gameId) })
    .toArray();
  return cursor;
}
