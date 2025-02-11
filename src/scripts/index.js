const inApp = document.querySelector("#inApp")
const menu = document.querySelector(".menu")
const appStore = document.querySelector(".appStore")
const projects = document.querySelector(".projects")
const contacts = document.querySelector(".contacts")
const music = document.querySelector(".music")
const appView = document.querySelector(".appView")

window.onkeydown = (e) => {
    if(e.keyCode == 27){
        if (appView.style.visibility === "visible") {
            hideAppView();
        } else {
            returnHome();
        }
    }
}

function appOpen(app) {
  // Hide all menus
  document.querySelectorAll('.menu').forEach(menu => {
    menu.style.visibility = 'hidden';
    menu.style.opacity = '0';
  });
  // Show inApp container
  document.querySelector('#inApp').style.visibility = 'visible';
  document.querySelector('#inApp').style.opacity = '1';

  if (app === 1) {
    document.querySelector('.menu.appStore').style.visibility = 'visible';
    document.querySelector('.menu.appStore').style.opacity = '1';
  } else if (app === 2) {
    document.querySelector('.menu.projects').style.visibility = 'visible';
    document.querySelector('.menu.projects').style.opacity = '1';
  } else if (app === 3) {
    document.querySelector('.menu.contacts').style.visibility = 'visible';
    document.querySelector('.menu.contacts').style.opacity = '1';
  } else if (app === 4) {
    document.querySelector('.menu.music').style.visibility = 'visible';
    document.querySelector('.menu.music').style.opacity = '1';
  }
}

function returnHome(){
    document.body.style.overflow = "hidden";
    inApp.style.overflow = menu.style.overflow = appView.style.overflow = "hidden";
    inApp.style.visibility = appStore.style.visibility = appView.style.visibility = projects.style.visibility = contacts.style.visibility = music.style.visibility = "hidden";
    inApp.style.opacity = menu.style.opacity = appView.style.opacity = "0";
}

function hideAppView(){
    appView.style.visibility = "hidden"
    appView.style.opacity = "0"
    appView.style.overflow = "hidden"
}

const appDetails = {
    "1": {
        title: "YouTube: Watch, Listen, Stream",
        subtitle: "Videos, Music and Live Streams",
        description: "Hello, I'm Anthony Huang. I grew up in Ontario and have a passion for technology. Welcome to my personal website where I share my journey.",
        openLink: "#" // update this link later
    },
    "2": {
        title: "Programming",
        subtitle: "HTML/CSS, JS/TS, Python",
        description: "When I was 8 years old, I stumbled upon the computer programming course on Khan Academy, where I was introduced to p5.js. I then moved on to making many projects on Scratch. I learned HTML/CSS when I was 10.\n\nI made my return to programming when I was 13, after my computer history/hardware/YouTuber phase. I learned basic C to get back into it, and then I finally formally learned JavaScript, where I made my first side project, a Discord Bot. Then I started making websites again, where it is still my primary specialty to this day. In later years, I picked up Python and TypeScript.",
        openLink: "#" // update this link later
    },
    "3": {
        title: "School",
        subtitle: "Grade 12, IBDP",
        description: "I am currently a high school student in Grade 12, enrolled in the International Baccalaureate Diploma Programme. I am taking HL English A (Language & Literature), HL French B, HL Geography, SL Chemistry, SL Physics, SL Mathematics AA.\n\nI am the Co-President of the Practical Section of our school's Computer Science Club, one of the biggest clubs at the school.\n\nI am an incoming Computer Science student at Carleton University, where I also hope to do a Linguistics minor. I am currently applying to Shopify Dev Degree.",
        openLink: "#" // update this link later
    },
    "4": {
        title: "Contests",
        subtitle: "2x Hackathon Winner",
        description: "I've participated in 5 hackathons, winning awards in 2; Hack the Ridge 2023 (Solo Male Winner) and Hack the Ridge 2024 (Best .xyz Use). In all five hackathons, I made websites using HTML/CSS/JS/TS.\n\nI have also participated in the Canadian Computing Competition, Junior Division, where I scored 56/75 (I TLE'd on J4 💀). I use Python for competitive programming.",
        openLink: "#" // update this link later
    },
    "5": {
        title: "Languages",
        subtitle: "English, French, Mandarin, Japanese",
        description: "I speak fluent English, B1 French, A2 Mandarin and A1 Japanese.\n\nI was born and lived in Québec for 8 years, where I spoke English and French on a daily basis (I lived in an Anglophone community in Montréal and indulged in mainly English media as a child). I spoke French at school with friends and used it outside the house. At home, I speak Chinese (Mandarin) and English with my family, as my parents are immigrants from China.\n\nWhen I was 8, I moved to Ontario, where I used English on the daily. While I still took French Immersion classes at school, my French skills quickly started to deteriorate over time as I had no opportunity to use them in daily life. My interest in the language has returned in Grade 12, where I am planning to do the DELF B2.\n\nWhen I was 15, I started watching anime again, and as I was travelling to Japan that summer, I decided to learn a bit of Japanese. Currently, I have my JLPT N5 certificate. I am pretty bad at speaking—as I have nobody to talk in Japanese with. The language has been really easy to learn thanks to my knowledge of Chinese. I am planning to take the JLPT N3 on December 2025. I keep up with my Japanese by studying with flashcards daily, watching Japanese Instagram Reels on my feed, as well as listening and singing Japanese music.",
        openLink: "#" // update this link later
    },
    "6": {
        title: "Games",
        subtitle: "Minecraft, Roblox, Rocket League",
        description: "I play a variety of games. I have been playing Minecraft and Roblox for a while, since elementary school.\n\nThe game I currently play most is probably Rocket League, where my peak is Diamond II in 2v2.\n\nThe game I have the most playtime on is Geometry Dash, with over 1000 hours on Steam, and 63 demons completed. My hardest is Future Funk (Hard Demon) and I had a 72% best on Acu (Extreme Demon).",
        openLink: "https://steamcommunity.com/profiles/76561199118468554/" // update this link later
    },
    "7": {
        title: "Football",
        subtitle: "CF Montréal, CanMNT",
        description: "My favorite sport is football. I am a fan of CF Montréal, my boyhood club (Toronto FC my #1 opp) and I obviously support the Canadian National Team. I have been to 5 Montréal games since 2016... where I saw them lose all of them 😭 (Including 3 games against TFC 🤬).\n\nI follow what happens in the world of football daily. I don't support any Premier League club, but I guess I can consider myself a Bayern München supporter, though my support for them is nowhere near my support for CF Montréal.\n\nIn real life, I played house league at my local soccer club on and off, and I can play any position on either wing. I can even play as backup goalkeeper because I have very strong reaction time and reflexes.",
        openLink: "#" // update this link later
    },
    "8": {
        title: "Anime",
        subtitle: "The only TV I watch",
        description: "I would say I watch a decent amount of anime. I first started watching anime in 2019, with my first being Dragon Ball Super (why did I start with Super? I don't know). Then in 2020, I watched JoJo's Bizarre Adventure, which became my favorite and the primary focus of my YouTube channel back then (I was a Roblox JoJo YouTuber). Unfortunately, due to some cyberbullying in that community (I was 12 at the time) I told myself I would never watch anime again.\n\nIn 2023, I was friends with people who were in the anime/manga scene, so I decided to give anime another try, watching Oshi no Ko (which just aired) and later Bocchi the Rock. These animes sparked my interest in learning Japanese.\n\nMy current favorites include Dragon Ball, JoJo's Bizarre Adventure, Pokémon, Steins;Gate, Bocchi the Rock!, and Horimiya.",
        openLink: "https://myanimelist.net/profile/FHDHGNGN"
    },
    "9": {
        title: "Favorites",
        subtitle: "Personal Picks",
        description: "My favorite color is #FF7700 and my lucky number is 4, details that reflect my unique style and personality.",
        openLink: "#" // update this link later
    },
    "10": {
        title: "Food",
        subtitle: "Cuisine",
        description: "I appreciate a wide range of foods, from juicy burgers to exquisite Japanese dishes that never fail to excite my taste buds.",
        openLink: "#" // update this link later
    },
    "11": {
        title: "My Setup",
        subtitle: "My Devices",
        description: "I proudly use an M2 MacBook Air paired with a Keychron K8 featuring Milky Yellows, showcasing my blend of style and functionality.",
        openLink: "#" // update this link later
    },
    "12": {
        title: "FHDHGNGN",
        subtitle: "Username Meaning",
        description: `
                FHDHGNGN has no meaning. When I made the username, I was playing a mobile game called The Blockheads, where I needed a username. I ended up keyboard smashing. FHDHGNGN is actually the simplified result of that username after I forgot the original keyboard smashed username. The following is a history of all my usernames up to now:

                2015-2016: xboxgolfer
                2016-2018: FHDHGNGNgaming
                2018-2019: FHDgaming
                2019-2019: FHD
                2019-2019: FHDFyre
                2019-2020: FyreBoye
                2020-2020: Robut
                2020-2020: Roebut444/Roebut4
                2020-now: anthonyhuang07/FHDHGNGN

                Nowadays though, the FHD in FHDHGNGN kinda means 'Full HD' as in 1080p.
        `,
        openLink: "#" // update this link later
    }
};

// Attach event listener to all view buttons
const viewButtons = document.querySelectorAll(".appStore-viewButton");
viewButtons.forEach(button => {
    button.addEventListener("click", () => {
        const appCard = button.closest(".app");
        const rank = appCard.querySelector(".rank").innerText.trim();
        const details = appDetails[rank];
        if(details){
            document.querySelector(".appView header h1").innerText = details.title;
            document.querySelector(".appView header h2").innerText = details.subtitle;
            document.querySelector(".appStore-appView-about p").innerText = details.description;
            // Set the open button based on details.openLink:
            const openButton = document.querySelector(".appStore-openButton");
            if(!details.openLink.trim() || details.openLink === "#"){
                openButton.classList.add("disabled");
                openButton.onclick = null;
            } else {
                openButton.classList.remove("disabled");
                openButton.onclick = () => {
                    window.open(details.openLink, "_blank"); // modified to open in a new tab
                };
            }
        }
        // Replace the placeholder image with the app icon
        const iconSrc = appCard.querySelector("img").src;
        document.querySelector(".appView header img").src = iconSrc;
        appView.style.visibility = "visible";
        appView.style.opacity = "1";
        appView.style.overflow = "auto";
    });
});