fav = document.getElementById("favSong");
const apiUrl = 'https://server.ah07.xyz/api/song';

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        fav.innerHTML = `
            <div>
            As of ${data.songDetails.date}, my favorite song is <a
                href="${data.songDetails.ytLink}">${data.songDetails.songEN} by ${data.songDetails.artist}.</a> (${data.songDetails.songJP}). My
            favorite artist is Ado, and my favorite genres are J-Pop and EDM.
            </div>
            <img src="${data.songDetails.artwork}"
            style="border-radius: 2rem;" />
        `
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });