import { Router } from "express";
import dbConnection from "../database.js";

const artistRouter = Router();

artistRouter.get("/", async (req, res) => {
  const query = /* SQL */ `SELECT * FROM artists ORDER BY artist_name;`;
  const [results] = await dbConnection.execute(query);
  res.json(results);
});

artistRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const query = /* SQL */ `SELECT * FROM artists WHERE artist_id=?;`;
  const values = [id];

  const [results] = await dbConnection.execute(query, values);
  res.json(results);
});

artistRouter.post("/", async (req, res) => {
  const artist = req.body;
  const query = /* SQL */ `INSERT INTO artists(artist_name) values (?);`;
  const values = [artist.artist_name];

  const [results] = await dbConnection.execute(query, values);
  res.json(results);
});

artistRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const artist = req.body;
  const query = /* SQL */ `UPDATE artists SET artist_name=? WHERE artist_id=?`;
  const values = [artist.artist_name, id];
  const [results] = await dbConnection.execute(query, values);
  res.json(results);
});

artistRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const query = /* SQL */ `DELETE FROM artists WHERE artist_id=?`;
  const values = [id];
  const [results] = await dbConnection.execute(query, values);
  res.json(results);
});

export default artistRouter;
