import express from "express";
import { getDatesISOFormat } from "../utils/utils.js";

const dateRoute = express.Router();

// Date data for the frontend
dateRoute.get("/", async (req, res) => {
  try {
    const dates = getDatesISOFormat();
    if (!dates) {
      return res.status("404").send("Dates not Found");
    }
    res.send(dates);
  } catch (err) {
    res.status("500").send("An error occured getting dates");
  }
});

export default dateRoute;
