import cors from "cors";
import express from "express";
import dbConnection from "./database.js";
import albumRouter from "./routes/albums.js";
import artistRouter from "./routes/artists.js";
import trackRouter from "./routes/tracks.js";
import searchRouter from "./routes/search.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/albums", albumRouter);
app.use("/artists", artistRouter);
app.use("/tracks", trackRouter);
app.use("/search", searchRouter);

const port = process.env.PORT || 4000;

// GET routing ----------------------------------------------------------------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.send("Node Express Music Base");
});

// Listeners ----------------------------------------------------------------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port} `);
});
