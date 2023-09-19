import { Router } from "express";
import connection from "../database.js";

const trackRouter = Router();

trackRouter.get("/tracks", (req, res) => {
  const query = /* SQL */ `SELECT * FROM tracks ORDER BY track_name`;
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results);
    }
  });
});

trackRouter.get("/tracks/:id", (req, res) => {
  const id = req.params.id;
  const query = /* SQL */ `SELECT * FROM tracks WHERE track_id=?;`;
  const values = [id];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results[0]);
    }
  });
});
trackRouter.post("/tracks", (req, res) => {
  const track = req.body;
  const query = /* SQL */ `INSERT INTO tracks(track_name, album_id) values (?,?);`;
  const values = [track.song_name, track.album_id];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results);
    }
  });
});
trackRouter.put("/tracks/:id", async (req, res) => {
  const id = req.params.id;
  const track = req.body;
  const query = /* SQL */ `UPDATE tracks SET track_name=?, album_id=? WHERE id=?`;
  const values = [track.name, album.id, id];
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
    } else {
      res.json(results);
    }
  });
});

export default trackRouter;
