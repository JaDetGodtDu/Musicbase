import { Router } from "express";
import connection from "../database.js";

const artistRouter = Router();

app.get("/artists", (req, res) => {
  const query = /* SQL */ `SELECT * FROM artists ORDER BY artist_name;`;
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results);
    }
  });
});

app.get("/artists/:id", (req, res) => {
  const id = req.params.id;
  const query = /* SQL */ `SELECT * FROM artists WHERE artist_id=?;`;
  const values = [id];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results[0]);
    }
  });
});

app.post("/artists", (req, res) => {
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

app.put("/artists/:id", (req, res) => {
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

app.delete("/artists/:id", async (req, res) => {
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
