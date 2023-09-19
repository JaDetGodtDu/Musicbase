import cors from "cors";
import express from "express";

import { getAlbums, getAlbum, addAlbum, updateAlbum, deleteAlbum } from "./routes/albums.js";
import { getArtists, getArtist, addArtist, updateArtist, deleteArtist } from "./routes/artists.js";
import { getTracks, getTrack, addTrack, updateTrack, deleteTrack } from "./routes/tracks.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT || 3000;

// GET routing ----------------------------------------------------------------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.send("Node Express working at /");
});

// Tables
app.get("/artists", getArtists);

app.get("/albums", getAlbums);

app.get("/tracks", getTracks);

// GET single records from table
app.get("/artists/:id", getArtist);

app.get("/albums/:id", getAlbum);

app.get("/tracks/:id", getTrack);

// POST routing --------------------------------------------------------------------------------------------------------------------------------
app.post("/artists", addArtist);

app.post("/albums", addAlbum);

app.post("/tracks", addTrack);
// PUT routing --------------------------------------------------------------------------------------------------------------------------------
app.put("/artists/:id", updateArtist);

app.put("/albums/:id", updateAlbum);

app.put("/tracks/:id", updateTrack);

// DELETE routing -----------------------------------------------------------------------------------------------------------------------------
app.delete("/artists/:id", deleteArtist);

app.delete("/albums/:id", deleteAlbum);

app.delete("/tracks/:id", deleteTrack);

// Listeners ----------------------------------------------------------------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port} `);
});
