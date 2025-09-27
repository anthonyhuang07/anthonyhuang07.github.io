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
          albumArt.src = '/assets/icons/defaultMusic.webp';
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

        nowPlayingArt.src = '/assets/icons/defaultMusic.webp';
        nowPlayingTextContainer.innerHTML = `
          <p>I'm not listening to anything right now!</p>
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

// #endregion

// #region Favorite Song

const favoriteSongDetails = {
  favoriteDate: "SEP 24, 2025",
  songName: "DEADPOOL (feat. KAF)",
  artistName: "Hoshimachi Suisei",
  albumArt: "https://images.genius.com/eeb2490ea2a00ea03ccec34e073e8cbe.1000x1000x1.png",
  link: "https://www.youtube.com/watch?v=Fg5-55vZwp0"
};

function renderFavoriteSong() {
  const favoriteSongContainer = document.querySelector('.music-favoriteSong');
  favoriteSongContainer.innerHTML = `
  <h2>Favorite Song</h2>
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

// #endregion

// #region Featured Songs

const featuredSongs = [
  {
    title: "Show",
    artist: "Ado",
    albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/80/e8/82/80e8826c-f877-9a74-0e7b-a142108feda0/23UMGIM92958.rgb.jpg/600x600bf-60.jpg",
    link: "https://www.youtube.com/watch?v=pgXpM4l_MwI"
  },
  {
    title: "AWAKE",
    artist: "Hoshimachi Suisei",
    albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/af/02/ed/af02ede0-cf69-ed76-65fd-7f969a30a409/HoshimachiSuisei_AWAKE_JKT.png/600x600bf-60.jpg",
    link: "https://www.youtube.com/watch?v=K9YGGOd63yc"
  },
  {
    title: "アイモライモ",
    artist: "tuki.",
    albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/29/0f/2c/290f2ce9-6af3-4ace-e5f7-d9c9df751c0e/4582649322263.jpg/600x600bf-60.jpg",
    link: "https://www.youtube.com/watch?v=urh7DZp59WU"
  },
  {
    title: "Moral Crumble",
    artist: "FantasticYouth",
    albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/2f/87/a3/2f87a3ac-624e-70e6-76a6-1ec1a409e706/21UMGIM25282.rgb.jpg/1200x630bb.jpg",
    link: "https://www.youtube.com/watch?v=Z3dVAI0_YTI"
  },
  {
    title: "Monotone",
    artist: "YOASOBI",
    albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/df/05/a9/df05a94d-ff41-e0e1-f156-f40ee7c9922b/198846242873.jpg/486x486bb.png",
    link: "https://www.youtube.com/watch?v=sJ-2X3rHtXw"
  },
  {
    title: "Circle",
    artist: "Lilas Ikuta",
    albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/d4/3e/cb/d43ecbf0-43bd-6507-3faa-a5a29f1683be/197188156664.jpg/1200x630bb.jpg",
    link: "https://example.com/track-5"
  },
  {
    title: "不治",
    artist: "Trooper Salute",
    albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/96/43/2a/96432a2b-764a-874a-4e82-5793f1c8dace/4580789718663.png/1200x630bb.jpg",
    link: "https://www.youtube.com/watch?v=_ti7ovjaDG4"
  },
  {
    title: "MURI MURI EVOLUTION",
    artist: "NANAOAKARI",
    albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/9d/a9/11/9da911e3-c3ee-7f2c-ca38-3fc34850885f/4547366756616.jpg/1200x630bb.jpg",
    link: "https://www.youtube.com/watch?v=o4OsvOqHnZM"
  },
  {
    title: "Tokihanate!",
    artist: "Hashimero",
    albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/25/ec/de/25ecde3a-0028-c1d1-4b66-5c3809d2cd52/4547366757477.jpg/1200x630bb.jpg",
    link: "https://www.youtube.com/watch?v=yDChK7w4II8"
  },
];

function renderfeaturedSongs() {
  const container = document.querySelector('.music-featuredSongs');
  if (!container) return;

  const items = featuredSongs.slice(0, 9);

  let gridHtml = items
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

// #region Featured Albums

const featuredAlbums = [
  {
    title: "Ado's Utattemita Album",
    artist: "Ado",
    albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/fa/e9/42/fae942a7-dca5-6cc0-9e49-4a4f2da6b81e/23UM1IM45777.rgb.jpg/600x600bf-60.jpg",
    link: "https://music.apple.com/album/ados-utattemita-album/1718531990"
  },
  {
    title: "新星目録",
    artist: "Hoshimachi Suisei",
    albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/33/8a/cd/338acd51-fd74-ca01-474c-128f2575b753/4571696527127.jpg/600x600bf-60.jpg",
    link: "https://music.apple.com/album/shinsei-mokuroku/1789078173"
  },
  {
    title: "15",
    artist: "tuki.",
    albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f3/c0/47/f3c04781-71d4-1a2c-5a50-81e68bddcc5d/4582649401234.jpg/600x600bf-60.jpg",
    link: "https://music.apple.com/album/15/1781833057"
  },
  {
    title: "BlueGuns",
    artist: "FantasicYouth",
    albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/2f/87/a3/2f87a3ac-624e-70e6-76a6-1ec1a409e706/21UMGIM25282.rgb.jpg/486x486bb.png",
    link: "https://music.apple.com/album/blueguns/1562602234"
  },
  {
    title: "Kessoku Band",
    artist: "kessoku band",
    albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/51/3b/00/513b003d-5583-4533-168b-f213c245b53f/4534530141828.jpg/600x600bf-60.jpg",
    link: "https://music.apple.com/album/%E7%B5%90%E6%9D%9F%E3%83%90%E3%83%B3%E3%83%89/1657318546"
  },
  {
    title: "Sketch",
    artist: "Lilas Ikuta",
    albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/d4/3e/cb/d43ecbf0-43bd-6507-3faa-a5a29f1683be/197188156664.jpg/600x600bf-60.jpg",
    link: "https://music.apple.com/album/sketch/1671948398"
  },
];

function renderFeaturedAlbums() {
  const container = document.querySelector('.music-featuredAlbums');
  if (!container) return;

  const items = featuredAlbums;
  const gridHtml = items
    .map(album => `
      <a class="album" href="${album.link}" target="_blank" rel="noopener noreferrer" aria-label="Open album ${album.title} by ${album.artist}">
        <img src="${album.albumArt}" alt="Album art for ${album.title} by ${album.artist}" />
        <p class="album-title">${album.title}</p>
        <p class="album-artist">${album.artist}</p>
      </a>
    `)
    .join('');

  container.innerHTML = `
    <h2>Featured Albums</h2>
    <div class="albums-row">${gridHtml}</div>
  `;
}

// #endregion

document.addEventListener("DOMContentLoaded", () => {
  renderFavoriteSong();
  renderfeaturedSongs();
  renderFeaturedAlbums();
  nowPlaying();
  setInterval(nowPlaying, 1000);
});