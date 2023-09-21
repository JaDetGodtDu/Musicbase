CREATE DATABASE musicbase_db;

USE musicbase_db;

-- Artist table
CREATE TABLE artists (
    artist_id INT AUTO_INCREMENT PRIMARY KEY,
    artist_name varchar(255) NOT NULL
);

-- Album table
CREATE TABLE albums (
    album_id INT AUTO_INCREMENT PRIMARY KEY,
    album_name varchar(255) NOT NULL,
    year_of_release INT NOT NULL
);
-- Song table
CREATE TABLE tracks (
    track_id INT AUTO_INCREMENT PRIMARY KEY,
    track_name varchar(255) NOT NULL
);

-- Junction Table
CREATE TABLE tracks_artists(
    track_id INT,
    artist_id INT,
    PRIMARY KEY (track_id,artist_id),
    FOREIGN KEY (track_id) REFERENCES tracks(track_id),
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id)
);
CREATE TABLE albums_tracks (
    album_id INT,
    track_id INT,
    PRIMARY KEY (album_id, track_id),
    FOREIGN KEY (album_id) REFERENCES albums(album_id),
    FOREIGN KEY (track_id) REFERENCES tracks(track_id)
);
INSERT INTO artists (artist_name) VALUES
    ('Metallica'),
    ('Iron Maiden'),
    ('Black Sabbath'),
    ('Slayer');

-- Insert data into the 'albums' table
INSERT INTO albums (album_name, year_of_release) VALUES
    ('Master of Puppets', 1986),          -- Metallica
    ('The Number of the Beast', 1982),   -- Iron Maiden
    ('Paranoid', 1970),                  -- Black Sabbath
    ('Reign in Blood', 1986);            -- Slayer

-- Insert data into the 'tracks' table
INSERT INTO tracks (track_name) VALUES
    ('Battery'),                  -- Master of Puppets by Metallica
    ('The Trooper'),             -- The Number of the Beast by Iron Maiden
    ('War Pigs'),                -- Paranoid by Black Sabbath
    ('Angel of Death');          -- Reign in Blood by Slayer

-- Insert data into the 'tracks_artists' junction table (associating songs with artists)
INSERT INTO tracks_artists (track_id, artist_id) VALUES
    (1, 1),   -- Battery by Metallica
    (2, 2),   -- The Trooper by Iron Maiden
    (3, 3),   -- War Pigs by Black Sabbath
    (4, 4);   -- Angel of Death by Slayer

    -- Insert data into the 'albums_tracks' junction table (associating albums with tracks)
INSERT INTO albums_tracks (album_id, track_id) VALUES
    (1, 1),   -- Master of Puppets (Battery)
    (2, 2),   -- The Number of the Beast (The Trooper)
    (3, 3),   -- Paranoid (War Pigs)
    (4, 4);   -- Reign in Blood (Angel of Death)

