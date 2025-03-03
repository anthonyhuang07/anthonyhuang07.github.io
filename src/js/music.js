const dynamicIsland = document.getElementById('dynamicIsland');
const albumArt = dynamicIsland.querySelector('img');
const apiUrl = 'https://server.ah07.xyz/api/status';

function nowPlaying() {
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      let found = false;
      for (let i = 0; i < data.status.length; i++) {
        if (data.status[i].name === "Apple Music") {
          let imageUrl = data.status[i].assets.largeImage;
          if (!imageUrl.startsWith('https://')) {
            imageUrl = 'https://' + imageUrl.replace(/^.*?is1/, 'is1');
          }
          albumArt.src = imageUrl;
          found = true;
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
