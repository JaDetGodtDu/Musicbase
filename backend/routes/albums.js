import { Router } from "express";
import connection from "../database.js";
const albumRouter = Router();

app.get("/albums", (req, res) => {
    const query = /* SQL */ `SELECT DISTINCT albums.*
  INNER JOIN albums_tracks ON `;
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results);
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
