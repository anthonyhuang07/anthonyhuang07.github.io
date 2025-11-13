const dynamicIsland = document.getElementById('dynamicIsland');
const albumArt = dynamicIsland.querySelector('img');
const audioPreview = dynamicIsland.querySelector('#audioPreview');
const songNameElement = dynamicIsland.querySelector('#songName');
const artistNameElement = dynamicIsland.querySelector('#artistName');
const playPauseButton = dynamicIsland.querySelector('#playPauseButton');
const currentTimeElement = dynamicIsland.querySelector('#currentTime');
const timeLeft = dynamicIsland.querySelector('#timeLeft');
const nowPlayingArt = document.querySelector('.music-nowPlaying img');
const nowPlayingTextContainer = document.querySelector('.music-nowPlaying > div > div');
const progressBar = dynamicIsland.querySelector('.progress-bar .progress');
const apiUrl = 'https://anthonyhuang.net/api/status';
const MUSIC_DATA_URL = '/src/data/music.json';
let musicData = null;
let musicDataPromise = null;

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

let intervalId;

function loadMusicData() {
  if (musicData) {
    return Promise.resolve(musicData);
  }
  if (!musicDataPromise) {
    musicDataPromise = fetch(MUSIC_DATA_URL)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load music data');
        return response.json();
      })
      .then((data) => {
        musicData = data;
        return data;
      })
      .catch((error) => {
        console.error('Error fetching music data:', error);
        musicDataPromise = null;
        return {};
      });
  }
  return musicDataPromise;
}

// #region Dynamic Island & Now Playing

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

        if (imageUrl.startsWith('mp:external/')) {
          let fixedUrl = imageUrl.split('/https/').pop();
          imageUrl = 'https://' + fixedUrl;
        }

        albumArt.crossOrigin = "Anonymous";
        albumArt.src = imageUrl;

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
          albumArt.src = '/assets/icons/defaultMusic.webp';
          nowPlayingArt.src = '/assets/icons/defaultMusic.webp';
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

      const nowPlayingBar = document.querySelector('.music-nowPlaying');

      if (!musicPlaying) {
        dynamicIsland.classList.remove('playing');
        albumArt.style.display = 'none';
        audioPreview.style.display = 'none';
        clearInterval(intervalId);

        nowPlayingArt.src = '/assets/icons/defaultMusic.webp';
        nowPlayingTextContainer.innerHTML = `
          <p>Not Playing</p>
        `;

        if (nowPlayingBar && !nowPlayingBar.querySelector('img.notPlayingBadge')) {
          const badge = document.createElement('img');
          badge.className = 'notPlayingBadge';
          badge.src = '/assets/elements/notPlaying.png';
          badge.alt = 'Not Playing';
          nowPlayingBar.appendChild(badge);
        }

        const playingBadge = document.querySelector('.music-nowPlaying img.playingControlsBadge');
        if (playingBadge) playingBadge.remove();
      } else {
        dynamicIsland.classList.add('playing');
        albumArt.style.display = 'block';
        audioPreview.style.display = 'flex';

        const badge = document.querySelector('.music-nowPlaying img.notPlayingBadge');
        if (badge) badge.remove();

        if (nowPlayingBar && !nowPlayingBar.querySelector('img.playingControlsBadge')) {
          const controls = document.createElement('img');
          controls.className = 'playingControlsBadge';
          controls.src = '/assets/elements/playingControls.png';
          controls.alt = 'Playback Controls';
          nowPlayingBar.appendChild(controls);
        }
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

// #endregion

// #region Favorite Song

function renderFavoriteSong(details) {
  const favoriteSongContainer = document.querySelector('.music-favoriteSong');

  favoriteSongContainer.innerHTML = `
  <h2>Favorite Song</h2>
    <div>
      <img src="${details.albumArt}" alt="Favorite Song Album Art" />
      <div>
        <div>
          <h6>${details.favoriteDate}</h6>
          <p>${details.songName}</p>
          <h5>${details.artistName}</h5>
        </div>
        <a href="${details.link}" target="_blank" rel="noopener noreferrer">Open</a>
      </div>
    </div>
  `;
}

// #endregion

// #region Featured Songs

function renderFeaturedSongs(songs = []) {
  const container = document.querySelector('.music-featuredSongs');

  let gridHtml = songs
    .map((song) => `
        <a class="song" href="${song.link}" target="_blank" rel="noopener noreferrer" aria-label="Play ${song.title} by ${song.artist}">
          <img src="${song.albumArt}" alt="Album art for ${song.title} by ${song.artist}" />
          <div class="meta">
            <p class="title">${song.title}</p>
            <p class="artist">${song.artist}</p>
          </div>
        </a>
      `)
    .join('');

  container.innerHTML = `
    <h2>Featured Songs</h2>
    <div class="featuredSongs-grid">
      ${gridHtml}
    </div>
  `;
}

// #endregion

// #region Favorite Artists

function renderFavoriteArtists(artists = []) {
  const container = document.querySelector('.music-favoriteArtists');

  const gridHtml = artists
    .map(artist => `
      <a class="artist" href="${artist.link}" target="_blank" rel="noopener noreferrer" aria-label="Open artist ${artist.name}">
        <img src="${artist.art}" alt="Album art for ${artist.name}" />
        <p class="artist-name">${artist.name}</p>
      </a>
    `)
    .join('');

  container.innerHTML = `
    <h2>Favorite Artists</h2>
    <div class="artists-row">${gridHtml}</div>
  `;
}

// #endregion


document.addEventListener("DOMContentLoaded", () => {
  loadMusicData()
    .then((data) => {
      renderFavoriteSong(data.favoriteSong);
      renderFeaturedSongs(data.featuredSongs || []);
      renderFavoriteArtists(data.favoriteArtists || []);
    })
    .catch(() => {
      renderFavoriteSong();
      renderFeaturedSongs();
      renderFavoriteArtists();
    });
  nowPlaying();
  setInterval(nowPlaying, 1000);
});
