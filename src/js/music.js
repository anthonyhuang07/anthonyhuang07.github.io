const dynamicIsland = document.getElementById('dynamicIsland');
const albumArt = dynamicIsland.querySelector('img');
const audioPreview = dynamicIsland.querySelector('#audioPreview');
const songNameElement = dynamicIsland.querySelector('#songName');
const artistNameElement = dynamicIsland.querySelector('#artistName');
const playPauseButton = dynamicIsland.querySelector('#playPauseButton');
const currentTimeElement = dynamicIsland.querySelector('#currentTime');
const timeLeft = dynamicIsland.querySelector('#timeLeft');
const progressBar = dynamicIsland.querySelector('.progress-bar .progress');
const apiUrl = 'https://server.ah07.xyz/api/status';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

let intervalId;

const favoriteSongDetails = {
  favoriteDate: "AUG 2, 2025",
  songName: "最低界隈 - Saitei Kaiwai",
  artistName: "tuki.",
  albumArt: "https://i.scdn.co/image/ab67616d0000b2735415cc68ed6af3a136bc396f",
  link: "https://www.youtube.com/watch?v=cENYLTXTOQ4"
};

function nowPlaying() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      let musicPlaying = false;
      if (data.status.type === "LISTENING") {
        musicPlaying = true;
        let imageUrl = data.status.assets.largeImage;
        let songName = data.status.details;
        let artistName = data.status.state;
        let startTime = new Date(data.status.timestamps.start).getTime();
        let endTime = new Date(data.status.timestamps.end).getTime();
        let currentTime = Date.now();
        let duration = endTime - startTime;
        let elapsed = currentTime - startTime;
        let remaining = duration - elapsed;

        if (artistName === "Anthony Huang") {
          imageUrl = '/assets/albumarts/huang.jpg';
        } else if (artistName === "Ryan Irvani") {
          imageUrl = '/assets/albumarts/irvani.png';
        } else if (imageUrl.startsWith('mp:external/')) {
          let fixedUrl = imageUrl.split('/https/').pop();
          imageUrl = 'https://' + fixedUrl;
        }

        albumArt.crossOrigin = "Anonymous";
        albumArt.src = imageUrl;

        const nowPlayingArt = document.querySelector('.music-nowPlaying img');
        const nowPlayingTextContainer = document.querySelector('.music-nowPlaying > div > div');
        nowPlayingArt.src = imageUrl;
        nowPlayingTextContainer.innerHTML = `
          <p class="music-nowPlaying-song">${songName}</p>
          <p class="music-nowPlaying-artist">${artistName}</p>
        `;

        albumArt.onload = () => {
          applyGradientEffect(albumArt);
        };

        albumArt.onerror = () => {
          console.error('Error loading album art image');
          albumArt.src = '/assets/icons/music.webp';
          albumArt.onload = () => {
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => {
              bar.style.backgroundColor = '#ffffff';
              bar.style.backgroundImage = 'none';
            });
          };
        };

        songNameElement.textContent = songName;
        artistNameElement.textContent = artistName;

        if (remaining > 0) {
          timeLeft.textContent = formatTime(remaining);
          currentTimeElement.textContent = formatTime(elapsed);
          progressBar.style.width = `${(elapsed / duration) * 100}%`;
        }
      }

      const nowPlayingArt = document.querySelector('.music-nowPlaying img');
      const nowPlayingTextContainer = document.querySelector('.music-nowPlaying > div > div');

      if (!musicPlaying) {
        dynamicIsland.classList.remove('playing');
        albumArt.style.display = 'none';
        audioPreview.style.display = 'none';
        clearInterval(intervalId);

        nowPlayingArt.src = '/assets/icons/music.webp';
        nowPlayingTextContainer.innerHTML = `
          <p>Not Playing</p>
        `;
      } else {
        dynamicIsland.classList.add('playing');
        albumArt.style.display = 'block';
        audioPreview.style.display = 'flex';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function formatTime(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function applyGradientEffect(imgElement) {
  const bars = document.querySelectorAll('.bar');

  canvas.width = imgElement.naturalWidth;
  canvas.height = imgElement.naturalHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

  const blurAmount = Math.max(15, canvas.width / 10);

  ctx.globalAlpha = 1;
  ctx.filter = `blur(${blurAmount}px)`;
  ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
  ctx.filter = 'none';

  bars.forEach((bar, index) => {
    const barCanvas = document.createElement('canvas');
    const barCtx = barCanvas.getContext('2d');
    barCanvas.width = canvas.width / bars.length * 1.2;
    barCanvas.height = canvas.height * 0.6;

    barCtx.drawImage(
      canvas,
      index * barCanvas.width * 0.8,
      canvas.height * 0.2,
      barCanvas.width,
      barCanvas.height,
      0,
      0,
      barCanvas.width,
      barCanvas.height
    );

    bar.style.backgroundImage = `url(${barCanvas.toDataURL()})`;
    bar.style.backgroundSize = 'cover';
    bar.style.backgroundPosition = 'center';
  });
}

function renderFavoriteSong() {
  const favoriteSongContainer = document.querySelector('.music-favoriteSong');
  favoriteSongContainer.innerHTML = `
    <div>
      <img src="${favoriteSongDetails.albumArt}" alt="Favorite Song Album Art" />
      <div>
        <div>
          <h6>${favoriteSongDetails.favoriteDate}</h6>
          <p>${favoriteSongDetails.songName}</p>
          <h5>${favoriteSongDetails.artistName}</h5>
        </div>
        <a href="${favoriteSongDetails.link}" target="_blank">Open</a>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderFavoriteSong();
  nowPlaying();
  setInterval(nowPlaying, 1000);
});