const nowplaying = document.getElementById('nowplaying');
const apiUrl = 'http://mc.ah07.xyz:4000/api/status';

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    if(data.status[0].name === "Apple Music"){
        nowplaying.innerHTML = `Currently Listening To: ${data.status[0].details} by ${data.status[0].state}.`
    } else {
        nowplaying.innerHTML = `Currently Listening To: Nothing.`
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
