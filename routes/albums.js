import { Router } from "express";
import connection from "../database.js";
const albumRouter = Router();

albumRouter.get("/", (request, response) => {
  const queryString = /*sql*/ `
        SELECT DISTINCT albums.album_id, albums.album_name, albums.year_of_release,
            artists.artist_id AS artistId, artists.artist_name AS artistName,
            tracks.track_id AS trackId, tracks.track_name AS trackName
        FROM albums
        INNER JOIN artists ON albums.artist_id = artists.artist_id
        INNER JOIN albums_tracks ON albums.album_id = albums_tracks.album_id
        INNER JOIN tracks ON albums_tracks.track_id = tracks.track_id
        INNER JOIN tracks_artists ON tracks.track_id = tracks_artists.track_id
        INNER JOIN artists AS trackArtists ON tracks_artists.artist_id = trackArtists.artist_id;
    `;
  connection.query(queryString, (error, results) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results);
    }
  });
});

app.get("/albums/:id", (req, res) => {
  const id = req.params.id;
  const query = /* SQL */ `SELECT * FROM albums WHERE album_id=?;`;
  const values = [id];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results[0]);
    }
  });
});

app.post("/albums", (req, res) => {
  const album = req.body;
  const query =
    /* SQL */
    `INSERT INTO albums(album_name, year_of_release, artist_id) values (?,?,?);`;
  const values = [album.album_name, album.year_of_release, album.artist_id];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results);
    }
  });
});

app.put("/albums/:id", (req, res) => {
  const id = req.params.id;
  const album = req.body;
  const query =
    /* SQL */
    `UPDATE albums SET album_name=?, year_of_release=?, artist_id=? WHERE id=?`;
  const values = [album.name, album.year_of_release, album.artist_id, id];
  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.json({ message: error });
    } else {
      res.json(results);
    }
  });
});

app.delete("/albums/:id", async (req, res) => {
  const id = req.params.id;
  const query = /* SQL */ `DELETE FROM albums WHERE id=?`;
  const values = [id];
  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.json({ message: error });
    } else {
      res.json(results);
    }
  });
});

export default albumRouter;
