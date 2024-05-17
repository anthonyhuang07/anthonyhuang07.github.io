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
            As of ${data.date}, my favorite song is <a
                href="${data.ytLink}">${data.songEN} by ${data.artist}.</a> (${data.songJP}). My
            favorite artist is Ado, and my favorite genres are J-Pop and EDM.
            </div>
            <img src="${data.artwork}"
            style="border-radius: 2rem;" />
        `
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });