const dynamicIsland = document.getElementById('dynamicIsland');
const albumArt = dynamicIsland.querySelector('img');
const apiUrl = 'https://server.ah07.xyz/api/status';

// Create a hidden canvas element
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

function nowPlaying() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.status.length; i++) {
        if (data.status[i].name === "Apple Music") {
          let imageUrl = data.status[i].assets.largeImage;

          // Fix mp:external URLs
          if (imageUrl.startsWith('mp:external/')) {
            let fixedUrl = imageUrl.split('/https/').pop();
            imageUrl = 'https://' + fixedUrl;
          }

          albumArt.crossOrigin = "Anonymous";
          albumArt.src = imageUrl;

          albumArt.onload = () => {
            applyGradientEffect(albumArt);
          };

          break;
        }
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

nowPlaying();
setInterval(nowPlaying, 1000);