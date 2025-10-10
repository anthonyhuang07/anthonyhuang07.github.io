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

const favoriteSongDetails = {
  favoriteDate: "OCT 4, 2025",
  songName: "Everyday World",
  artistName: "Yukino Yukinoshita & Yui Yuigahama",
  albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/0e/32/03/0e320365-e756-f2d2-d4cb-ba59b3017abb/5021732649164.jpg/1200x630bb.jpg",
  link: "https://www.youtube.com/watch?v=rbVFAF9BmwE"
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
    title: "劣等上等 歌ってみた",
    artist: "FantasticYouth",
    albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/95/0c/20/950c2012-f8c2-67b8-4321-2a4138557c1a/199066040836.jpg/600x600bf-60.jpg",
    link: "https://www.youtube.com/watch?v=wBglu_UImio"
  },
  {
    title: "風と私の物語",
    artist: "Ado",
    albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/8f/4f/e9/8f4fe91a-4783-7799-d5ac-af8b1a57422e/25UM1IM34698.rgb.jpg/1200x630bb.jpg",
    link: "https://www.youtube.com/watch?v=oAuKa5NOzWE"
  },
  {
    title: "DEADPOOL (feat. KAF)",
    artist: "Hoshimachi Suisei",
    albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/33/8a/cd/338acd51-fd74-ca01-474c-128f2575b753/4571696527127.jpg/600x600bf-60.jpg",
    link: "https://www.youtube.com/watch?v=Fg5-55vZwp0"
  },
  {
    title: "最低界隈",
    artist: "tuki.",
    albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/8d/4f/9c/8d4f9c88-6734-55ee-f2b7-4f545c71e645/4547366770599.jpg/1200x630bb.jpg",
    link: "https://www.youtube.com/watch?v=UAsdgWVwXlc"
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
    title: "Flashbacker",
    artist: "kessoku band",
    albumArt: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/51/3b/00/513b003d-5583-4533-168b-f213c245b53f/4534530141828.jpg/486x486bb.png",
    link: "https://www.youtube.com/watch?v=ecVnw_SiREQ"
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
];

function renderFeaturedSongs() {
  const container = document.querySelector('.music-featuredSongs');
  if (!container) return;

  let gridHtml = featuredSongs
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

const favoriteArtists = [
  {
    name: "Ado",
    art: "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages221/v4/cc/19/c9/cc19c998-8c2a-b278-d0ed-d85c5a04fedc/ami-identity-75a97779b1fcac49bfafa6c4b7a6a78f-2025-01-10T01-04-23.725Z_cropped.png/486x486bb.png",
    link: "https://www.youtube.com/@Ado1024/releases"
  },
  {
    name: "Hoshimachi Suisei",
    art: "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages221/v4/33/b7/12/33b71234-9a80-bb43-ba51-90957936aa67/ami-identity-e6d23ad47868d1a630f4c3d23676d80b-2024-11-14T13-08-57.789Z_cropped.png/486x486bb.png",
    link: "https://www.youtube.com/@HoshimachiSuisei/releases"
  },
  {
    name: "tuki.",
    art: "https://is1-ssl.mzstatic.com/image/thumb/Features126/v4/94/6e/ac/946eace6-19bd-50fb-47e3-11d1e6069308/mzl.lbazlcoq.jpg/486x486bb.png",
    link: "https://www.youtube.com/@tuki.music_official/releases"
  },
  {
    name: "FantasticYouth",
    art: "https://is1-ssl.mzstatic.com/image/thumb/Features126/v4/74/b2/fd/74b2fdac-51dd-470f-a65e-1c5d9425c1b2/mzl.yovtyvrc.jpg/486x486bb.png",
    link: "https://www.youtube.com/@fantasticyouth3913/releases"
  },
  {
    name: "YOASOBI",
    art: "https://is1-ssl.mzstatic.com/image/thumb/Features211/v4/56/15/1b/56151bed-1098-5871-e142-6958c608e1df/mzl.yauzwfvn.jpg/486x486bb.png",
    link: "https://www.youtube.com/@Ayase_YOASOBI/releases"
  },
  {
    name: "Lilas Ikuta",
    art: "https://is1-ssl.mzstatic.com/image/thumb/Features211/v4/a8/88/ae/a888ae75-fd6f-5299-303d-b7df7d2ab90c/mzl.dandmemk.jpg/486x486bb.png",
    link: "https://www.youtube.com/@Lilas_Ikuta/releases"
  },
  {
    name: "kessoku band",
    art: "https://lh3.googleusercontent.com/JQIgeDQZjVs4Jgj5QgptQU3gBQ9H-RkLyqNU-5s1_zxNS5qn6mWG--I4TlChdGt319elzvllUrnWpGs=w544-h544-p-l90-rj",
    link: "https://www.youtube.com/channel/UC6IhDHJbJUoRJGUPnlh5GRQ"
  },
];

function renderFavoriteArtists() {
  const container = document.querySelector('.music-favoriteArtists');
  if (!container) return;

  const items = favoriteArtists;
  const gridHtml = items
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
  renderFavoriteSong();
  renderFeaturedSongs();
  renderFavoriteArtists();
  nowPlaying();
  setInterval(nowPlaying, 1000);
});