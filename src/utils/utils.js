import { Temporal } from "@js-temporal/polyfill";
import schedule from "node-schedule";
import fs from "fs";
import { processPlays } from "../middleware/boardgameMiddleWare.js";
import { fetchPlaysByDate } from "./fetchUtils.js";
import { fileURLToPath } from "url";
import path from "path";

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
  // Fetch Data once per day at 3AM UTC | 0 3 * * *
  // Initial Data is scraped at 2AM UTC | 0 2 * * *
  // Fetched data is written to a local JSON file which is served by the route.
  const cronString = "0 3 * * *";
  const { dateArray } = getDatesISOFormat();

  schedule.scheduleJob(cronString, async () => {
    const data = await fetchPlaysByDate(dateArray);
    const preparedData = await processPlays(data);
    writeData(preparedData);
  });
}

export function writeData(data) {
  const jsonData = JSON.stringify(data);
  const absolutePath = process.env.BOARDGAMEDATA;
  fs.writeFile(absolutePath, jsonData, (err) => {
    if (err) {
      console.error("Error writing data to file \n", err);
      return;
    }
    console.log("File written successfully");
  });
}
