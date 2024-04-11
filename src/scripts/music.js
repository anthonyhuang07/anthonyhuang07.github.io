const nowplaying = document.getElementById('nowplaying');
const apiUrl = 'https://server.ah07.xyz/api/status';

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    for (let i = 0; i < data.status.length; i++) {
      if (data.status[i].name === "Apple Music") {
        nowplaying.innerHTML = `Currently Listening To: ${data.status[i].details} by ${data.status[i].state}.`
        break
      } else {
        nowplaying.innerHTML = `Currently Listening To: Nothing.`
      }
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
