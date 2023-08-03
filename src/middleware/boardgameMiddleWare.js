import { fetchPlayByID, fetchOneBoardGameByID } from "../data/boardgameData.js";

export async function processPlays(playArray) {
  const filteredPlayArray = removeDuplicates(playArray);
  const resultPlayData = await Promise.all(
    filteredPlayArray.map((gameID) => fetchPlayByID(gameID))
  );
  const payload = await processPlayData(resultPlayData);
  return payload;
}

export function removeDuplicates(gameArray) {
  const stringIdArray = getGameIdStrings(gameArray);
  const uniqueGameArray = [...new Map(stringIdArray.map((e) => [e, e])).values()];
  return uniqueGameArray;
}

async function processPlayData(playData) {
  const boardGameArray = [];
  for (const playDataArray of playData) {
    const boardGame_id = playDataArray[0].boardGame_ref.toString();
    const boardGameInfo = await fetchOneBoardGameByID(boardGame_id);
    const gameObject = { boardGameInfo, plays: [] };

    boardGameArray.push(gameObject);
  }

  for (const gameObject of boardGameArray) {
    for (const playDataArray of playData) {
      if (idMatches(playDataArray, gameObject)) {
      }
    }
  }

  boardGameArray.forEach((gameObject) => {
    playData.forEach((playDataArray) => {
      if (idMatches(playDataArray, gameObject)) {
        playDataArray.forEach((play) => {
          gameObject.plays.push({ date: play.date, play: play.playCount });
        });
      }
    });
  });

  return boardGameArray;
}

function idMatches(playDataArray, gameObject) {
  if (playDataArray[0].boardGame_ref.toString() === gameObject.boardGameInfo._id.toString()) {
    return true;
  }
  return false;
}

function getGameIdStrings(gameArray) {
  return gameArray.map((game) => {
    return game.boardGame_ref.toString();
  });
}

// TODO
// DEPRECIATED?
export async function fetchPlayData(client, gameId) {
  // Fetch every play document that matches the gameID
  const cursor = await client
    .db("bggPlayDB")
    .collection("playCollection")
    .find({ boardGame_ref: new ObjectId(gameId) })
    .toArray();
  return cursor;
}
