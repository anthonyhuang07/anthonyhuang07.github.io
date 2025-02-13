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
        const { songEN, songJP, artist, ytLink, date, artwork } = data.songDetails;
        fav.innerHTML = `
            <div>
            As of ${date}, my favorite song is <a href="${ytLink}" target="_blank">${songEN} by ${artist}.</a> (${songJP}). My
            favorite artist is Ado, and my favorite genres are J-Pop and EDM.
            </div>
            <img src="${artwork}" style="border-radius: 2rem;" />
        `;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });