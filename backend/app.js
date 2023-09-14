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

// GET single records from table
app.get("/artists/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM artists WHERE artist_id=?;";
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
  const query = "SELECT * FROM albums WHERE album_id=?;";
  const values = [id];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results[0]);
    }
  });
});

app.get("/songs/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM songs WHERE song_id=?;";
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
  const query = "INSERT INTO artists(artist_name) values (?);";
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
  const query = "INSERT INTO albums(album_name, year_of_release, artist_id) values (?,?,?);";
  const values = [album.album_name, album.year_of_release, album.artist_id];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results);
    }
  });
});

app.post("/songs", (req, res) => {
  const song = req.body;
  const query = "INSERT INTO songs(song_name, album_id) values (?,?);";
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

// DELETE routing -----------------------------------------------------------------------------------------------------------------------------
app.delete("/artists/:id", async (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM artists WHERE id=?";
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
  const query = "DELETE FROM albums WHERE id=?";
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
app.delete("/songs/:id", async (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM songs WHERE id=?";
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
