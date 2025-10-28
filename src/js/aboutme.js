const appDetails = {
    "1": {
        title: "Who am I?",
        subtitle: "Anthony Huang, 18, Chinese-Canadian",
        description: `Hey! I'm Anthony Huang, a 18-year-old Chinese-Canadian 🇨🇦⚜️🇨🇳 university student based in Ottawa.

        <br><br>I'm passionate about all things tech 💻, whether it's geeking out over computer history and cool modern tech, hunting for vintage hardware, repairing devices, or solving problems through software and code.

        <br><br>Outside of tech, I'm into geography and geopolitics 🌎, languages 💬, anime 🎥, listening & singing to J-Pop 🎵, vlogging and editing 🎬, mobile photography 📸, sports ⚽️🏒, and travelling ✈️.`,
        link: "#",
        icon: "https://cdn.iconscout.com/icon/free/png-256/free-find-my-icon-download-in-svg-png-gif-file-formats--iphone-ios-13-ios13-ipad-os-14-pack-user-interface-icons-1575949.png?f=webp&w=256"
    },
    "2": {
        title: "Education",
        subtitle: "1st Year Computer Science @ Carleton University",
        description: `I am a first-year Computer Science 💻 student at Carleton University 🎓. I am also pursuing a minor in Linguistics.

        <br><br>In High School, I completed the International Baccalaureate Diploma Programme (IBDP) and Ontario Secondary School Diploma (OSSD) with a French Immersion Certificate. I also served as Co-President of the Computer Science Club.`,
        link: "https://www.linkedin.com/in/anthonyhuang07/",
        icon: "https://play-lh.googleusercontent.com/oUIb5n6akLJ0fk66LiD8jk89_Ya9HK-8a4NJpPxNe4d8cE0B7_HJjDhrx6WTR90FJxiF"
    },
    "3": {
        title: "Programming",
        subtitle: "Front-End Specialist, 2x Hackathon Winner",
        description: `I currently specialize in Front-End Web Development 🌐. I am familiar with HTML, CSS/SCSS, JavaScript/TypeScript, Python, and a bit of C.

        <br><br>Almost everything I know in this field is self-taught. I started programming at 8 years old when I stumbled across the p5.js course on Khan Academy. 
        
        <br><br>I've participated in 5 Hackathons, winning 🏆 in 2 of them.`,
        link: "https://github.com/anthonyhuang07",
        icon: "https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU"
    },
    "4": {
        title: "Languages",
        subtitle: "English, French, Chinese, Japanese, Learning Korean",
        description: `I speak fluent English 🇬🇧, B2 French 🇫🇷, B1 Mandarin 🇨🇳, A2 Japanese 🇯🇵, Learning Korean 🇰🇷.

        <br><br>I was born and raised in Québec, where I regularly spoke both English and French. I then moved to Ontario, where English became my primary language. Although I continued studying French at school, my fluency gradually declined due to a lack of regular exposure. However, in Grade 12, my passion for the language reignited. I currently hold a DELF B2 certificate.
        
        <br><br>My interest in Japanese began when I was 15, sparked by Anime, J-Pop and an upcoming trip to Japan. I currently hold a JLPT N5 certificate. I plan to take the JLPT N3 this December.
        
        <br><br>I am currently learning Korean in University 🎓 as an elective.`,
        link: "#",
        icon: "https://play-lh.googleusercontent.com/0IH4L3pX-jqQXKYCDmxTM5t3Tvak2cb_zUuIs9nKCHPeOqkaRJ_bRTq1qKawsSvunw"
    },
    "5": {
        title: "Anime",
        subtitle: "60+ Days of Watchtime, 100+ Entries on MAL",
        description: `I watch a lot of anime, mainly new releases & recent romcoms. Click the Open button to check out my MAL profile to see what I watch and my favorites!`,
        link: "https://myanimelist.net/profile/FHDHGNGN",
        icon: "https://play-lh.googleusercontent.com/zVwzSU7ozKU0x78V7zYWDw2XFjgGsBBJA_qIJQXAFnS1R3VemFbpdaV9Bm3zOTTHvXw"
    },
    "6": {
        title: "Games",
        subtitle: "Rocket League D1, 1K+ Hours on Geometry Dash",
        description: `I play a variety of games. I've been playing Minecraft and Roblox the longest, games I always come back to once in a while. I am particularly good at SkyWars Lucky Blocks on Hypixel.

        <br><br>The game I have the most playtime on is Geometry Dash, with over 1000 hours on Steam, and 63 <a href="https://docs.google.com/spreadsheets/d/1yMG_bfNijhOFoA28eDFQneuVe2sNq_K7p3913CDdIX8/edit?gid=0#gid=0" target="_blank">Demons</a> completed. My hardest is Future Funk (Hard Demon) and I had a 72% PB on Acu (Extreme Demon).

        <br><br>I also play <a href="https://rocketleague.tracker.network/rocket-league/profile/epic/fhdhgngn/" target="_blank">Rocket League</a> (Diamond I 💎), TETR.IO (A-) and Minesweeper (Canada 🇨🇦 Top 500)`,
        link: "https://steamcommunity.com/profiles/76561199118468554/",
        icon: "/assets/icons/steam.webp"
    },
    "7": {
        title: "Sports",
        subtitle: "Montréal Canadiens, CF Montréal",
        description: `My favorite sports are Football ⚽️ and Hockey 🏒. In football, I am a fan of CF Montréal ⚜️, my boyhood club. Of course in hockey, I support the Montréal Canadiens.`,
        link: "https://www.youtube.com/watch?v=qgIOXoHwOeM",
        icon: "https://play-lh.googleusercontent.com/BoCbco5x4p64e2fc0XkGEpgvsH42gReh4OzKYeoYnFpUfmKD96clplFFKk7JpxVmMNM"
    },
    "8": {
        title: "Transit",
        subtitle: "Urban Rail Enthusiast & Avgeek",
        description: `I enjoy riding and learning about urban rail systems 🚉 (metros, light rails, etc.) around the world. I also love commercial aviation ✈️, which is the backbone of global travel.

        <br><br>My favorite rail systems include the Tokyo Metro 🇯🇵, Montréal Metro 🇨🇦, and Ottawa O-Train 🇨🇦.

        <br><br>I've flown ~70,000 km (~100 hours) on 15 flights since 2023. My favorite airports include Incheon 🇰🇷 (ICN), Vancouver 🇨🇦 (YVR), and Shenzhen Bao'an 🇨🇳 (SZX). My favorite aircraft is the Boeing 747, especially the Air China livery.`,
        link: "#",
        icon: "https://www.apple.com/v/maps/d/images/overview/intro_icon__dfyvjc1ohbcm_large.png"
    },
    "9": {
        title: "Setup",
        subtitle: "M4 MacBook Air, Keychron K8, AKG K240",
        description: "I use an M4 MacBook Air 💻 for everything (R.I.P Hardware Failure M2 MacBook Air). I'm a keyboard enthusiast as well, using a Keychron K8 ⌨️ (Lubed Gateron Milky Yellows). For audio, I use the AKG K240 Studio Headphones 🎧 and a Blue Snowball iCE Microphone 🎙️.",
        link: "#",
        icon: "https://cdn.jim-nielsen.com/ios/512/amazon-shopping-2021-03-02.png?rf=1024"
    },
    /*
    "10": {
        title: "FHDHGNGN",
        subtitle: "What does FHDHGNGN mean?",
        description: `
                FHDHGNGN has no meaning. When I made the username, I was playing a mobile game called The Blockheads, where I needed a username. I ended up keyboard smashing. FHDHGNGN is actually the simplified result of that username after I forgot the original keyboard smashed username. The following is a history of all my usernames up to now:

                <br><br>• 2015-2016: xboxgolfer
                <br>• 2016-2018: FHDHGNGNgaming
                <br>• 2018-2019: FHDgaming
                <br>• 2019-2019: FHD
                <br>• 2019-2019: FHDFyre
                <br>• 2019-2020: FyreBoye
                <br>• 2020-2020: Robut
                <br>• 2020-2020: Roebut444/Roebut4
                <br>• 2020-now: anthonyhuang07/FHDHGNGN

                <br><br>Nowadays though, the FHD in FHDHGNGN kinda means 'Full HD' as in 1080p.
        `,
        link: "#",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_Notes_icon.svg/1024px-Apple_Notes_icon.svg.png"
    }
    */
};

function createApp() {
    const appsContainer = document.getElementById("apps");
    appsContainer.innerHTML = Object.keys(appDetails)
        .map(rank => {
            const details = appDetails[rank];
            return `
            <div class="app">
              <div>
                <img src="${details.icon}" alt="${details.title}">
                <div>
                  <div>
                    <p class="rank">${rank}</p>
                    <p class="name">${details.title}</p>
                  </div>
                  <div>
                    <p class="descMargin">${rank}</p>
                    <p class="desc">${details.subtitle}</p>
                  </div>
                </div>
              </div>
              <div>
                <p class="appStore-viewButton">View</p>
              </div>
            </div>`;
        }).join("");
}

function openAppView(rank) {
    const details = appDetails[rank];
    if (!details) return;
    document.querySelector(".appView header h1").innerText = details.title;
    document.querySelector(".appView header h2").innerText = details.subtitle;
    document.querySelector(".appStore-appView-about p").innerHTML = details.description;
    const openButton = document.querySelector(".appStore-openButton");
    if (!details.link.trim() || details.link === "#") {
        openButton.classList.add("disabled");
        openButton.onclick = null;
    } else {
        openButton.classList.remove("disabled");
        openButton.onclick = () => window.open(details.link, "_blank");
    }
    document.querySelector(".appView header img").src = details.icon;
    const appView = document.querySelector(".appView");
    if (appView) {
        appView.style.visibility = "visible";
        appView.style.opacity = "1";
        appView.style.overflow = "auto";
    }
    if (window.innerWidth <= 480) {
        document.querySelector('#apps').style.display = 'none';
    }
}

function hideAppView() {
    const appView = document.querySelector(".appView");
    if (appView) {
        appView.style.visibility = "hidden";
        appView.style.opacity = "0";

    }
    if (window.innerWidth <= 480) {
        document.querySelector('#apps').style.display = 'flex';
    }
}

function attachAppListeners() {
    document.getElementById("apps").addEventListener("click", (event) => {
        const card = event.target.closest(".app");
        if (!card) return;
        const rank = card.querySelector(".rank")?.textContent.trim();
        if (rank) openAppView(rank);
    });
}