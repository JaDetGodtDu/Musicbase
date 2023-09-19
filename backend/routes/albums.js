import connection from "../database.js";

// ======== GET ======== //
function getAlbums(res) {
  const query = "SELECT * FROM albums";
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      res.json(results);
    }
  });
}

function getAlbum(req, res) {
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
}

// ======== POST ======== //
function addAlbum(req, res) {
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
}

// ======== PUT ======== //
function updateAlbum(req, res) {
  const id = req.params.id;
  const album = req.body;
  const query = "UPDATE albums SET album_name=?, year_of_release=?, artist_id=? WHERE id=?";
  const values = [album.name, album.year_of_release, album.artist_id, id];
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
function deleteAlbum(req, res) {
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
}

// ======== EXPORT ======== //

export { getAlbums, getAlbum, addAlbum, updateAlbum, deleteAlbum };
