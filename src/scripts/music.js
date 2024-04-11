const nowplaying = document.getElementById('nowplaying');
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
      if (data.status === "Offline") {
        nowplaying.innerHTML = `Currently Listening To: Nothing.`
      } else {
        nowplaying.innerHTML = `Currently Listening To: ${data.status[i].details} by ${data.status[i].state}.`
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

}

nowPlaying()

setInterval(nowPlaying, 1000);