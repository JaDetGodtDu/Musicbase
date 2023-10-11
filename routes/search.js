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

  res.json(albumsResults);
});

// Track search route
searchRouter.get("/tracks", async (req, res) => {
  const query = req.query.q.toLowerCase();
  const queryTracks = /* sql */ `
        SELECT * FROM tracks WHERE track_name LIKE ? ORDER BY track_name;`;

  const values = [`%${query}%`];

  const [tracksResults] = await dbConnection.execute(queryTracks, values);

  res.json(tracksResults);
});

// Artist search route
searchRouter.get("/artists", async (req, res) => {
  const query = req.query.q.toLowerCase();
  const queryArtists = /* sql */ `
        SELECT * FROM artists WHERE artist_name LIKE ? ORDER BY artist_name;`;

  const values = [`%${query}%`];

  const [artistsResults] = await dbConnection.execute(queryArtists, values);

  res.json(artistsResults);
});

export default searchRouter;
