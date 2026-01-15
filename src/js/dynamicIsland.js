const dynamicIsland = document.getElementById('dynamicIsland');
const albumArt = dynamicIsland.querySelectorAll('.island-albumArt');
const audioPreview = dynamicIsland.querySelectorAll('.island-audioPreview');
const songNameElement = dynamicIsland.querySelector('#songName');
const artistNameElement = dynamicIsland.querySelector('#artistName');
const currentTimeElement = dynamicIsland.querySelector('#currentTime');
const timeLeft = dynamicIsland.querySelector('#timeLeft');
const nowPlayingArt = document.querySelector('.music-nowPlaying img');
const nowPlayingTextContainer = document.querySelector('.music-nowPlaying > div > div');
const progressBar = dynamicIsland.querySelector('.progress-bar .progress');
const mediaControls = dynamicIsland.querySelector('#mediaControls');
const apiUrl = 'https://anthonyhuang.net/api/status';
let frozenPlayback = null;
let frozenSessionId = null;
let currentAlbumArtUrl = null;

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

let intervalId;

// Dynamic Island mobile tap handling
dynamicIsland.addEventListener('click', (e) => {
  if (dynamicIsland.classList.contains('playing')) {
    e.preventDefault();
    dynamicIsland.classList.toggle('expanded');
    if (dynamicIsland.classList.contains('expanded')) {
      playContainerAnimation('dynamicIslandExpand');
    } else {
      playContainerAnimation('dynamicIslandCollapse');
    }
  }
});

document.addEventListener('click', (e) => {
  if (!dynamicIsland.contains(e.target) && dynamicIsland.classList.contains('expanded')) {
    dynamicIsland.classList.remove('expanded');
    playContainerAnimation('dynamicIslandCollapse');
  }
});

dynamicIsland.addEventListener('mouseenter', () => {
  if (!dynamicIsland.classList.contains('playing')) return;
  playContainerAnimation('dynamicIslandExpand');
});

dynamicIsland.addEventListener('mouseleave', () => {
  if (!dynamicIsland.classList.contains('playing')) return;
  playContainerAnimation('dynamicIslandCollapse');
});

function nowPlaying() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      let musicPlaying = false;
      const isOnline = data.online !== false;
      if (data.status && data.status.type === "LISTENING") {
        musicPlaying = true;
        let imageUrl = data.status?.assets?.largeImage;
        if (typeof imageUrl !== 'string' || imageUrl.length === 0) {
          imageUrl = '/assets/icons/defaultMusic.webp';
        }
        let songName = data.status.details;
        let artistName = data.status.state;
        let startTime = new Date(data.status.timestamps.start).getTime();
        let endTime = new Date(data.status.timestamps.end).getTime();
        let currentTime = Date.now();
        let duration = endTime - startTime;
        let elapsed = currentTime - startTime;
        let remaining = duration - elapsed;
        const sessionId = data.status.sessionId || `${songName}-${artistName}-${startTime}`;

        if (!isOnline) {
          if (!frozenPlayback || frozenSessionId !== sessionId) {
            frozenPlayback = data.frozenPlayback || { duration, elapsed, remaining };
            frozenSessionId = sessionId;
          }
          elapsed = frozenPlayback.elapsed;
          remaining = frozenPlayback.remaining;
        } else {
          frozenPlayback = null;
          frozenSessionId = null;
        }

        if (imageUrl.startsWith('mp:external/')) {
          let fixedUrl = imageUrl.split('/https/').pop();
          imageUrl = 'https://' + fixedUrl;
        }

        if (imageUrl !== currentAlbumArtUrl) {
          dynamicIsland.classList.remove('ready');
          currentAlbumArtUrl = imageUrl;
        }

        albumArt.forEach(img => {
          img.crossOrigin = "Anonymous";
          img.src = imageUrl;
          
          img.onload = () => {
            colorBars(img);
            dynamicIsland.classList.add('ready');
          };

          img.onerror = () => {
            console.error('Error loading album art image');
            img.src = '/assets/icons/defaultMusic.webp';
            nowPlayingArt.src = '/assets/icons/defaultMusic.webp';
            img.onload = () => {
              const bars = document.querySelectorAll('.bar');
              bars.forEach(bar => {
                bar.style.backgroundColor = '#ffffff';
                bar.style.backgroundImage = 'none';
              });
              dynamicIsland.classList.add('ready');
            };
          };
        });

        nowPlayingArt.src = imageUrl;
        nowPlayingTextContainer.innerHTML = `
          <p class="music-nowPlaying-song">${songName}</p>
          <p class="music-nowPlaying-artist">${artistName}</p>
        `;

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
        dynamicIsland.classList.remove('paused');
        dynamicIsland.classList.remove('ready');
        dynamicIsland.style.animation = '';
        dynamicIsland.style.animationDelay = '';
        frozenPlayback = null;
        frozenSessionId = null;
        currentAlbumArtUrl = null;
        albumArt.forEach(img => img.style.display = 'none');
        audioPreview.forEach(preview => preview.style.display = 'none');
        if (mediaControls) {
          mediaControls.src = '/assets/elements/dynamicIslandControls.png';
        }

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
        if (data.online === false) {
          dynamicIsland.classList.add('paused');
          if (mediaControls) {
            mediaControls.src = '/assets/elements/dynamicIslandControlsPaused.png';
          }
        } else {
          dynamicIsland.classList.remove('paused');
          if (mediaControls) {
            mediaControls.src = '/assets/elements/dynamicIslandControls.png';
          }
        }
        albumArt.forEach(img => img.style.display = 'block');
        audioPreview.forEach(preview => preview.style.display = 'flex');

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

function colorBars(imgElement) { // Fill in bars with blurred album art
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

document.addEventListener("DOMContentLoaded", () => {
  nowPlaying();
  intervalId = setInterval(nowPlaying, 1000);
});
