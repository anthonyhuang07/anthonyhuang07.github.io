const MUSIC_DATA_URL = '/src/data/music.json';
let musicData = null;
let musicDataPromise = null;

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
          <p>${details.title}</p>
          <h5>${details.artist}</h5>
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
    <h2>Now Listening</h2>
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
      renderFeaturedSongs(data.featuredSongs);
      renderFavoriteArtists(data.favoriteArtists);
    })
});
