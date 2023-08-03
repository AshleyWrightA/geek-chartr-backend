import express from "express";
import cors from "cors";
import boardgameRoute from "./routes/boardgame.js";
import dateRoute from "./routes/date.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use("/boardgame", boardgameRoute);
app.use("/date", dateRoute);

app.get("/", (req, res) => {
  res.send("Success");
});

app.use((req, res) => {
  res.send("404");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
