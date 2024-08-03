// script.js

const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause-btn');
const stopBtn = document.getElementById('stop-btn');
const progressBar = document.getElementById('progress-bar');
const trackName = document.getElementById('track-name');
const trackArtist = document.getElementById('track-artist');

let isPlaying = false;

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = 'Play';
        isPlaying = false;
    } else {
        audio.play();
        playPauseBtn.textContent = 'Pause';
        isPlaying = true;
    }
});

stopBtn.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    playPauseBtn.textContent = 'Play';
    isPlaying = false;
});

audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progress = (currentTime / duration) * 100;
    progressBar.value = progress;
});

progressBar.addEventListener('input', () => {
    const progress = progressBar.value;
    const duration = audio.duration;
    const currentTime = (progress / 100) * duration;
    audio.currentTime = currentTime;
});

// Set track info
trackName.textContent = 'Track Name';
trackArtist.textContent = 'Track Artist';

// server.js

const express = require('express');
const app = express();
const port = 3000;
const db = require('./db'); // Assuming you have a database module

app.use(express.static('public'));

app.get('/play-song/:id', (req, res) => {
  const songId = req.params.id;
  db.getSongById(songId)
    .then(song => {
      const songUrl = song.url;
      res.redirect(songUrl);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error retrieving song');
    });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});