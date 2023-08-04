import express from "express";

const boardGameRoute = express.Router();
import { fetchPlaysByDate } from "../data/boardgameData.js";
import { processPlays } from "../middleware/boardgameMiddleWare.js";
import { getDatesISOFormat } from "../utils/utils.js";

boardGameRoute.get("/", async (req, res) => {
  try {
    const { dateArray } = getDatesISOFormat();
    const data = await fetchPlaysByDate(dateArray);
    if (!data) {
      return res.status(404).send("Nothing Found");
    }
    const preparedData = await processPlays(data);
    res.send(preparedData);
  } catch (err) {
    res.status(500).send("An error occured");
    console.log(err);
  }
});

export default boardGameRoute;
