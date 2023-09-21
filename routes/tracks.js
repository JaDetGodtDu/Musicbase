import { Router } from "express";
import connection from "../database.js";

const trackRouter = Router();

trackRouter.get("/", (request, response) => {
  const queryString = /*sql*/ `
        SELECT tracks.*,
       artists.artist_name AS artistName,
       artists.artist_id AS artistId
FROM tracks
INNER JOIN tracks_artists ON tracks.track_id = tracks_artists.track_id
INNER JOIN artists ON tracks_artists.artist_id = artists.artist_id
`;

  connection.query(queryString, (error, results) => {
    if (error) {
      console.log(error);
      response.json({ message: error });
    } else {
      response.json(results);
    }
  });
});

trackRouter.get("/:id", (request, response) => {
  const id = request.params.id;
  const queryString = /*sql*/ `
        SELECT tracks.*,
               artists.artist_name AS artistName,
               artists.artist_id AS artistId
        FROM tracks
        INNER JOIN tracks_artists ON tracks.track_id = tracks_artists.track_id
        INNER JOIN artists ON tracks_artists.artist_id = artists.artist_id
        WHERE tracks.track_id = ?;
    `;

  const values = [id];

  connection.query(queryString, values, (error, results) => {
    if (error) {
      console.log(error);
      response.json({ message: error });
    } else {
      response.json(results[0]);
    }
  });
});

trackRouter.post("/", (req, res) => {
  const track = req.body;
  const query = /* SQL */ `INSERT INTO tracks(track_name, album_id) values (?,?);`;
  const values = [track.track_name, track.album_id];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.json({ message: error });
    } else {
      res.json(results);
    }
  });
});
trackRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const track = req.body;
  const query = /* SQL */ `UPDATE tracks SET track_name=?, album_id=? WHERE track_id=?`;
  const values = [track.track_name, track.album_id, id];
  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.json({ message: error });
    } else {
      res.json(results);
    }
  });
});
trackRouter.delete("/tracks/:id", async (req, res) => {
  const id = req.params.id;
  const query = /* SQL */ `DELETE FROM tracks WHERE id=?`;
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

export default trackRouter;
