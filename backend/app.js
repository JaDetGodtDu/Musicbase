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

// GET routing ----------------------------------------------------------------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.send("Node Express working at /");
});

// Tables
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

app.get("/albums", (req, res) => {
  const query = /* SQL */ `SELECT * FROM albums`;
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results);
    }
  });
});

app.get("/tracks", (req, res) => {
  const query = /* SQL */ `SELECT * FROM tracks ORDER BY track_name`;
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results);
    }
  });
});

// GET single records from table
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

app.get("/tracks/:id", (req, res) => {
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

// POST routing --------------------------------------------------------------------------------------------------------------------------------
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

app.post("/tracks", (req, res) => {
  const song = req.body;
  const query = /* SQL */ `INSERT INTO tracks(track_name, album_id) values (?,?);`;
  const values = [song.song_name, song.album_id];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results);
    }
  });
});
// PUT routing --------------------------------------------------------------------------------------------------------------------------------
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
app.put("/tracks/:id", async (req, res) => {
  const id = req.params.id;
  const song = req.body;
  const query = /* SQL */ `UPDATE tracks SET track_name=?, album_id=? WHERE id=?`;
  const values = [song.name, album.id, id];
  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.json({ message: error });
    } else {
      res.json(results);
    }
  });
});
// DELETE routing -----------------------------------------------------------------------------------------------------------------------------
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
app.delete("/tracks/:id", async (req, res) => {
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
// Listeners ----------------------------------------------------------------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port} `);
});
