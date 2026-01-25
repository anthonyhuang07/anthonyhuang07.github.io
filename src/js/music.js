const MUSIC_DATA_URL = 'https://anthonyhuang.net/api/music';
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

// #region Album Art Resolution

function norm(s) {
  return (s ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")      // accents
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9\s']/g, " ")        // punctuation -> space
    .replace(/\s+/g, " ")
    .trim();
}

async function resolveAlbumArt(title, artist) {
  const qTitle = norm(title);
  const qArtist = norm(artist);

  const query = encodeURIComponent(`${title} ${artist}`);
  const res = await fetch(
    `https://anthonyhuang.net/api/applemusic?term=${query}&limit=10`
  );

  if (!res.ok) return null;

  const data = await res.json();
  const results = Array.isArray(data.results) ? data.results : [];
  if (!results.length) return null;

  // Keep only candidates that match the artist
  const candidates = results.filter(r => {
    const a = norm(r.artistName);
    const t = norm(r.trackName);

    const artistMatch = a === qArtist || a.includes(qArtist) || qArtist.includes(a);
    const titleMatch = t === qTitle;

    return artistMatch && (titleMatch || t.includes(qTitle));
  });

  const pool = candidates.length ? candidates : results;

  // Score candidates: exact title match + artist match + "single-ish" bonus + small trackCount bonus
  let best = null;
  let bestScore = -Infinity;

  for (const r of pool) {
    if (!r?.artworkUrl100) continue;

    let score = 0;

    const c = norm(r.collectionName);
    const t = norm(r.trackName);

    if (c === t) score += 10;

    // Smaller collections tend to be singles/EPs
    // (on iTunes, track results often include collection trackCount)
    if (typeof r.trackCount === "number") {
      if (r.trackCount <= 3) score += 15;      // single / small EP
      else if (r.trackCount >= 10) score -= 5; // album-ish
    }

    if (score > bestScore) {
      bestScore = score;
      best = r;
    }
  }

  if (!best?.artworkUrl100) return null;

  return best.artworkUrl100.replace("100x100", "400x400");
}

// #endregion


// #region Favorite Song

async function renderFavoriteSong(details) {
  const container = document.querySelector('.music-favoriteSong');

  const albumArt =
    details.albumArt ??
    (await resolveAlbumArt(details.title, details.artist));

  container.innerHTML = `
    <h2>Favorite Song</h2>
    <div>
      <img src="${albumArt ?? '/img/placeholder.png'}" />
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

async function renderFeaturedSongs(songs = []) {
  const container = document.querySelector('.music-featuredSongs');

  const resolvedSongs = await Promise.all(
    songs.map(async (song) => {
      if (song.albumArt) return song;

      const albumArt = await resolveAlbumArt(song.title, song.artist);
      return { ...song, albumArt };
    })
  );

  const gridHtml = resolvedSongs
    .map((song) => `
      <a class="song" href="${song.link}" target="_blank" rel="noopener noreferrer">
        <img src="${song.albumArt}"
             alt="Album art for ${song.title} by ${song.artist}" />
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

// #region Playlists

function renderPlaylists(playlists = []) {
  const container = document.querySelector('.music-playlists');

  const gridHtml = playlists
    .map(playlist => `
      <a class="playlist" href="${playlist.link}" target="_blank" rel="noopener noreferrer" aria-label="Open playlist ${playlist.name}">
        <img src="${playlist.art}" alt="Playlist art for ${playlist.name}" />
        <div class="meta">
          <p class="playlist-name">${playlist.name}</p>
        </div>
      </a>
    `)
    .join('');

  container.innerHTML = `
    <h2>Playlists</h2>
    <div class="playlists-row">${gridHtml}</div>
  `;
}

// #endregion

document.addEventListener("DOMContentLoaded", () => {
  loadMusicData()
    .then((data) => {
      renderFavoriteSong(data.favoriteSong);
      renderFeaturedSongs(data.featuredSongs);
      renderFavoriteArtists(data.favoriteArtists);
      renderPlaylists(data.playlists);
    })
});
