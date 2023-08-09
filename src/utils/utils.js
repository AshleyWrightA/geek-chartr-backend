import { Temporal } from "@js-temporal/polyfill";
import schedule from "node-schedule";
import fs from "fs";
import { processPlays } from "../middleware/boardgameMiddleWare.js";
import { fetchPlaysByDate } from "./fetchUtils.js";

export function getDatesISOFormat() {
  const dateArray = [];
  for (let i = 1; i <= 14; i++) {
    try {
      let date = Temporal.Now.plainDateISO();
      dateArray.push(date.subtract({ days: i }).toString());
    } catch (err) {
      console.error(err);
    }
  }
  return { dateArray: dateArray.reverse() };
}

export function dailyFetch() {
  // Fetch Data once per day at 8PM
  // Initual Data is scraped at 7PM
  // Fetched data is written to a local JSON file which is served by the route.
  const cronString = "0 20 * * *";
  const { dateArray } = getDatesISOFormat();

  schedule.scheduleJob(cronString, async () => {
    const data = await fetchPlaysByDate(dateArray);
    const preparedData = await processPlays(data);
    writeData(preparedData);
  });
}

function writeData(data) {
  const jsonData = JSON.stringify(data);
  fs.writeFile("./src/data/boardGameData.json", jsonData, (err) => {
    if (err) {
      console.error("Error writing data to file", err);
      return;
    }
    console.log("File written successfully");
  });
}
