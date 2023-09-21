import { Router } from "express";
import connection from "../database.js";
const albumRouter = Router();

albumRouter.get("/", async (request, response) => {
  const queryString = /*sql*/ `
          SELECT DISTINCT albums.*
          FROM albums
  INNER JOIN albums_tracks ON albums.album_id = albums_tracks.album_id
  INNER JOIN tracks ON albums_tracks.track_id = tracks.track_id
  INNER JOIN tracks_artists ON tracks.track_id = tracks_artists.track_id
  INNER JOIN artists ON tracks_artists.artist_id = artists.artist_id
      `;

  const [results] = await connection.execute(queryString);
  response.json(results);
});

albumRouter.get("/:id", async (request, response) => {
  const id = request.params.id;

  const queryString = /*sql*/ `
        SELECT  albums.*,
        artists.artist_name AS artistName,
        tracks.track_id AS trackId,
        tracks.track_name AS trackName,
        artists.artist_id AS artistId
        FROM albums
        INNER JOIN albums_tracks ON albums.album_id = albums_tracks.album_id
        INNER JOIN tracks ON albums_tracks.track_id = tracks.track_id
        INNER JOIN tracks_artists ON tracks.track_id = tracks_artists.track_id
        INNER JOIN artists ON tracks_artists.artist_id = artists.artist_id
        WHERE albums.album_id = ?
    `;
  const values = [id];

  const [results] = await connection.execute(queryString, values);
  response.json(results);
});

albumRouter.get("/:id/tracks", async (request, response) => {
  const id = request.params.id;

  const queryString = /*sql*/ `
        SELECT albums.album_id AS albumId,
               albums.album_name AS albumTitle,
               albums.year_of_release AS albumReleaseDate,
               tracks.track_id AS trackId,
               tracks.track_name AS trackTitle,
               artists.artist_name AS artistName
        FROM albums
        INNER JOIN albums_tracks ON albums.album_id = albums_tracks.album_id
        INNER JOIN tracks ON albums_tracks.track_id = tracks.track_id
        INNER JOIN tracks_artists ON tracks.track_id = tracks_artists.track_id
        INNER JOIN artists ON tracks_artists.artist_id = artists.artist_id
        WHERE albums.album_id = ?;
    `;
  const values = [id];

  const [results] = await connection.execute(queryString, values);
  response.json(results);
});
albumRouter.get("/search", async (request, response) => {
  const query = request.query.q.toLocaleLowerCase();
  const queryString = /*sql*/ `
    SELECT * 
    FROM albums
    WHERE album_name LIKE ?
    ORDER BY album_name`;
  const values = [`%${query}%`];
  const [results] = await connection.execute(queryString, values);
  response.json(results);
});

albumRouter.post("/", async (req, res) => {
  const album = req.body;
  const albumQuery =
    /* SQL */
    `INSERT INTO albums(album_name, year_of_release) values (?,?);`;
  const albumValues = [album.album_name, album.year_of_release];

  const [results] = await connection.execute(albumQuery, albumValues);
  res.json(results);
});

albumRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const album = req.body;
  const query =
    /* SQL */
    `UPDATE albums SET album_name=?, year_of_release=? WHERE album_id=?`;
  const values = [album.album_name, album.year_of_release, id];
  const [results] = await connection.execute(query, values);
  res.json(results);
});

albumRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const query = /* SQL */ `DELETE FROM albums WHERE album_id=?`;
  const values = [id];
  const [results] = await connection.execute(query, values);
  res.json(results);
});

export default albumRouter;
