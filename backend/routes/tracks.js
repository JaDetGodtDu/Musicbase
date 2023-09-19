import connection from "../database.js";

// ======== GET ======== //

function getTracks(res) {
  const query = "SELECT * FROM songs ORDER BY song_name";
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results);
    }
  });
}

function getTrack(req, res) {
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
}

// ======== POST ======== //

function addTrack(req, res) {
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
}

// ======== PUT ======== //

function updateTrack(req, res) {
  const id = req.params.id;
  const song = req.body;
  const query = "UPDATE songs SET song_name=?, album_id=? WHERE id=?";
  const values = [song.name, album.id, id];
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

function deleteTrack(req, res) {
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
}

// ======== EXPORT ======== //

export { getTracks, getTrack, addTrack, updateTrack, deleteTrack };
