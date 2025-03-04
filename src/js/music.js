const dynamicIsland = document.getElementById('dynamicIsland');
const albumArt = dynamicIsland.querySelector('img');
const audioPreview = dynamicIsland.querySelector('#audioPreview');
const apiUrl = 'https://server.ah07.xyz/api/status';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

function nowPlaying() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      let musicPlaying = false;
      for (let i = 0; i < data.status.length; i++) {
        if (data.status[i].name === "Apple Music") {
          musicPlaying = true;
          let imageUrl = data.status[i].assets.largeImage;

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

      if (!musicPlaying) {
        albumArt.style.display = 'none';
        audioPreview.style.display = 'none';
      } else {
        albumArt.style.display = 'block';
        audioPreview.style.display = 'flex';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function applyGradientEffect(imgElement) {
  const bars = document.querySelectorAll('.bar');

  canvas.width = imgElement.naturalWidth;
  canvas.height = imgElement.naturalHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

  ctx.globalAlpha = 1;
  ctx.filter = 'blur(15px)';
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
  setInterval(nowPlaying, 1000);
});