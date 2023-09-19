import { Router } from "express";
import connection from "../database.js";

const artistRouter = Router();

artistRouter.get("/artists", (req, res) => {
  const query = /* SQL */ `SELECT * FROM artists ORDER BY artist_name;`;
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results);
    }
  });
});
artistRouter.get("/search", (request, response) => {
  const query = request.query.q.toLocaleLowerCase();
  const queryString = /*sql*/ `
    SELECT * 
    FROM artists
    WHERE name LIKE ?
    ORDER BY name`;
  const values = [`%${query}%`];
  connection.query(queryString, values, (error, results) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results);
    }
  });
});

artistRouter.get("/artists/:id", (req, res) => {
  const id = req.params.id;
  const query = /* SQL */ `SELECT * FROM artists WHERE artist_id=?;`;
  const values = [id];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results[0]);
    }
  });
});
artistRouter.get("/:id/albums", (request, response) => {
  const id = request.params.id;

  const queryString = /*sql*/ `
        SELECT DISTINCT albums.album_id AS albumId, 
                        albums.album_name AS albumName,
                        albums.year_of_release AS releaseDate,
                        artists.artist_id AS artistId,
                        artists.artist_name AS artistName
        FROM albums
        INNER JOIN artists ON albums.artist_id = artists.artist_id
        INNER JOIN albums_tracks ON albums.album_id = albums_tracks.album_id
        INNER JOIN tracks ON albums_tracks.track_id = tracks.track_id
        INNER JOIN tracks_artists ON tracks.track_id = tracks_artists.track_id
        INNER JOIN artists AS trackArtists ON tracks_artists.artist_id = trackArtists.artist_id
        WHERE artists.artist_id = ?;
    `;

  const values = [id];

  connection.query(queryString, values, (error, results) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results);
    }
  });
});

artistRouter.post("/artists", (req, res) => {
  const artist = req.body;
  const query = /* SQL */ `INSERT INTO artists(artist_name) values (?);`;
  const values = [artist.artist_name];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results);
    }
  });
});

artistRouter.put("/artists/:id", (req, res) => {
  const id = req.params.id;
  const artist = req.body;
  const query = /* SQL */ `UPDATE artists SET artist_name=? WHERE id=?`;
  const values = [artist.name, id];
  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.json({ message: error });
    } else {
      res.json(results);
    }
  });
});

artistRouter.delete("/artists/:id", async (req, res) => {
  const id = req.params.id;
  const query = /* SQL */ `DELETE FROM artists WHERE id=?`;
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

export default artistRouter;
