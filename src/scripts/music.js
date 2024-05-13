const nowplaying = document.getElementById('nowplaying');
const art = document.getElementById('art');
const apiUrl = 'https://server.ah07.xyz/api/status';

nowplaying.innerHTML = ` Nothing.`;

function nowPlaying() {
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      let timeLeft = '';
      for (let i = 0; i < data.status.length; i++) {
        if (data.status[i].name === "Apple Music") {
          const endTimestamp = new Date(data.status[i].timestamps.end);
          const currentTime = new Date();
          let timeDifference = endTimestamp - currentTime;

          timeDifference = Math.max(timeDifference, 0);

          // Convert time difference to seconds
          const totalSeconds = Math.floor(timeDifference / 1000);
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;

          timeLeft = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

          nowplaying.innerHTML = `<b>${data.status[i].details}</b><br>${data.status[i].state}<br>${timeLeft} left`;
          art.src = `https://${(data.status[i].assets.largeImage).replace(/^.*?is1/, 'is1')}`
          art.title = `${data.status[i].assets.largeText}`
          break;
        } else {
          nowplaying.innerHTML = ` Nothing.`;
          art.src = ``
          art.title = ``
        }
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

}

nowPlaying()

setInterval(nowPlaying, 1000);
