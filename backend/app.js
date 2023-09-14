import cors from "cors";
import express from "express";
import connection from "./database.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT || 3000;

// GET routing
app.get("/", (req, res) => {
  res.send("Node Express working at /");
});

app.get("/artists", (req, res) => {
  const query = "SELECT * FROM artists ORDER BY artist_name;";
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results);
    }
  });
});

app.get("/albums", (req, res) => {
  const query = "SELECT * FROM albums";
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results);
    }
  });
});

app.get("/songs", (req, res) => {
  const query = "SELECT * FROM songs ORDER BY song_name";
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results);
    }
  });
});

// POST routing

// PUT routing

// DELETE routing

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port} `);
});
