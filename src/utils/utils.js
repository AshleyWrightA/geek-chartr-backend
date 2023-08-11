import { Temporal } from "@js-temporal/polyfill";
import schedule from "node-schedule";
import fs from "fs";
import { processPlays } from "../middleware/boardgameMiddleWare.js";
import { fetchPlaysByDate } from "./fetchUtils.js";

export function getDatesISOFormat() {
  const dateArray = [];

  //Get the last 14 days, excluding yesterday & today
  for (let i = 2; i <= 15; i++) {
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
  // Fetch Data once per day at 9PM UTC | 0 21 * * *
  // Initial Data is scraped at 8PM UTC | 0 20 * * *
  // Fetched data is written to a local JSON file which is served by the route.
  const cronString = "0 21 * * *";
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
