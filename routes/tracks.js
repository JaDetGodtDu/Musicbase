import { Router } from "express";
import connection from "../database.js";

const trackRouter = Router();

trackRouter.get("/", async (request, response) => {
  const queryString = /*sql*/ `
        SELECT tracks.*,
       artists.artist_name AS artistName,
       artists.artist_id AS artistId 
FROM tracks
INNER JOIN tracks_artists ON tracks.track_id = tracks_artists.track_id
INNER JOIN artists ON tracks_artists.artist_id = artists.artist_id
`;
  const [results] = await connection.execute(queryString);
  response.json(results);
});

trackRouter.get("/:id", async (request, response) => {
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

  const [results] = await connection.execute(queryString, values);
  response.json(results);
});

trackRouter.get("/search", async (request, response) => {
  const query = request.query.q.toLocaleLowerCase();
  const queryString = /*sql*/ `
    SELECT * 
    FROM tracks
    WHERE track_name LIKE ?
    ORDER BY track_name`;
  const values = [`%${query}%`];
  const [results] = await connection.execute(queryString, values);
  response.json(results);
});

trackRouter.post("/", async (req, res) => {
  const track = req.body;
  const trackQuery = /* SQL */ `INSERT INTO tracks(track_name) VALUES (?);`;
  const trackValues = [track.track_name];

  const [trackResult] = await connection.execute(trackQuery, trackValues);
  const newTrackId = trackResult.insertId;
  const artistTrackQuery = /*sql*/ `INSERT INTO tracks_artists (artist_id, track_id) VALUES(?,?)`;
  const artistTrackValues = [track.artistId, newTrackId];
  const [artistTrackResult] = await connection.execute(artistTrackQuery, artistTrackValues);
  const albumTrackQuery = /*sql*/ `INSERT INTO albums_tracks (album_id, track_id) VALUES(?,?)`;
  const albumTrackValues = [track.albumId, newTrackId];
  const [albumTrackResults] = await connection.execute(albumTrackQuery, albumTrackValues);
  console.log(artistTrackResult, albumTrackResults);
  res.json({ message: "New song created" });
});
trackRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const track = req.body;
  const query = /* SQL */ `UPDATE tracks SET track_name=? WHERE track_id=?`;
  const values = [track.track_name, id];
  const [results] = await connection.execute(query, values);
  res.json(results);
});
trackRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const query = /* SQL */ `DELETE FROM tracks WHERE track_id=?`;
  const values = [id];
  const [results] = await connection.execute(query, values);
  res.json(results);
});

export default trackRouter;
