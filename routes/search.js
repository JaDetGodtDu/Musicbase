import { Router } from "express";
import dbConnection from "../database.js";

const searchRouter = Router();

// Album search route

searchRouter.get("/albums", async (req, res) => {
  const query = req.query.q.toLowerCase();
  const queryAlbums = /* sql */ `
        SELECT * FROM albums WHERE album_name LIKE ? ORDER BY album_name;`;

  const values = [`%${query}%`];
  const [albumsResults] = await dbConnection.execute(queryAlbums, values);

  if (!albumsResults || albumsResults.length === 0) {
    res.status(404).json({ message: "No albums found" });
  } else {
    res.json(albumsResults);
  }
});

// Track search route
searchRouter.get("/tracks", async (req, res) => {
  const query = req.query.q.toLowerCase();
  const queryTracks = /* sql */ `
        SELECT * FROM tracks WHERE track_name LIKE ? ORDER BY track_name;`;

  const values = [`%${query}%`];

  const [tracksResults] = await dbConnection.execute(queryTracks, values);

  if (!tracksResults || tracksResults.length === 0) {
    res.status(404).json({ message: "No tracks found" });
  } else {
    res.json(tracksResults);
  }
});

// Artist search route
searchRouter.get("/artists", async (req, res) => {
  const query = req.query.q.toLowerCase();
  const queryArtists = /* sql */ `
        SELECT * FROM artists WHERE artist_name LIKE ? ORDER BY artist_name;`;

  const values = [`%${query}%`];

  const [artistsResults] = await dbConnection.execute(queryArtists, values);

  if (!artistsResults || artistsResults.length === 0) {
    res.status(404).json({ message: "No artists found" });
  } else {
    res.json(artistsResults);
  }
});

export default searchRouter;
