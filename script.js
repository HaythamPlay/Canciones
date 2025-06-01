const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');
const playlist = document.getElementById('playlist');
let songs = playlist.getElementsByTagName('li');
let currentSongIndex = 0;

// Formato mm:ss
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Cargar duración
audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});

// Actualizar progreso
audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + '%';
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

// Reproducir / pausar
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '⏸';
  } else {
    audio.pause();
    playBtn.textContent = '▶';
  }
});

// Click en barra para cambiar tiempo
progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const newTime = (clickX / width) * audio.duration;
  audio.currentTime = newTime;
});

// Volumen
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

// Playlist
for (let i = 0; i < songs.length; i++) {
  songs[i].addEventListener('click', () => {
    setSong(i);
    audio.play();
    playBtn.textContent = '⏸';
  });
}

function setSong(index) {
  songs[currentSongIndex].classList.remove('active');
  currentSongIndex = index;
  songs[currentSongIndex].classList.add('active');
  audio.src = songs[currentSongIndex].getAttribute('data-src');
  audio.currentTime = 0;
  durationEl.textContent = '0:00';
  currentTimeEl.textContent = '0:00';
}
