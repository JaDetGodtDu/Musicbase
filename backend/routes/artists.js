import connection from "./database.js";

// ======== GET ======== //
function getArtists(res) {
  const query = "SELECT * FROM artists ORDER BY artist_name;";
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results);
    }
  });
}

function getArtist(req, res) {
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
}

// ======== POST ======== //

function addArtist(req, res) {
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
}

// ======== PUT ======== //

function updateArtist(req, res) {
  const id = req.params.id;
  const artist = req.body;
  const query = "UPDATE artists SET artist_name=? WHERE id=?";
  const values = [artist.name, id];
  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.json({ message: error });
    } else {
      res.json(results);
    }
  });
}

// ======== DELETE ======== //

function deleteArtist(req, res) {
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
}

// ======== EXPORT ======== //

export { getArtists, getArtist, addArtist, updateArtist, deleteArtist };
