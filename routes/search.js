import { Router } from "express";
import dbConnection from "../database.js";

const searchRouter = Router();

searchRouter.get("/", async (req, res) => {
  const query = req.query.q.toLocaleLowerCase();
  const queryArtists = /*sql*/ `
        SELECT * FROM artists WHERE name LIKE ? ORDER BY name;`;
  const queryTracks = /* sql */ `
        SELECT * FROM tracks WHERE name LIKE ? ORDER BY name;`;
  const queryAlbums = /* sql */ `
        SELECT * FROM albums WHERE name LIKE ? ORDER BY name;`;

  const values = [`%${query}%`];

  const [artistsResults] = await dbConnection.execute(queryArtists, values);
  const [tracksResults] = await dbConnection.execute(queryTracks, values);
  const [albumsResults] = await dbConnection.execute(queryAlbums, values);
  console.log(artistsResults, tracksResults, albumsResults);

  const results = {
    artists: artistsResults,
    tracks: tracksResults,
    albums: albumsResults,
  };

  if (!results) {
    res.status(404).json({ message: "No results found" });
  } else {
    res.json(results);
  }
});

export default searchRouter;
