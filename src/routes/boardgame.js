import express from "express";
import data from "../data/boardGameData.json" assert { type: "json" };
const boardGameRoute = express.Router();

boardGameRoute.get("/", async (req, res) => {
  try {
    const result = data;
    if (!result) {
      return res.status(404).send("Nothing Found");
    }
    res.send(result);
  } catch (err) {
    res.status(500).send("An error occured getting boardgame data.");
    console.log(err);
  }
});

export default boardGameRoute;
