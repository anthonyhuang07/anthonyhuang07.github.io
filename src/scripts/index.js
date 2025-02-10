const inApp = document.querySelector("#inApp")
const menu = document.querySelector(".menu")
const appStore = document.querySelector(".appStore")
const projects = document.querySelector(".projects")
const contacts = document.querySelector(".contacts")
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

function appOpen(app){
    inApp.style.visibility = "visible";
    inApp.style.opacity = "1";
    document.body.style.overflow = "auto";
    switch(app){
        case 1:
            appStore.style.visibility = "visible";
            appStore.style.overflow = "auto";
            appStore.style.opacity = "1";
            break;
        case 2:
            projects.style.visibility = "visible";
            projects.style.overflow = "auto";
            projects.style.opacity = "1";
            break;
        case 3:
            contacts.style.visibility = "visible";
            contacts.style.overflow = "auto";
            contacts.style.opacity = "1";
    }
}

function returnHome(){
    document.body.style.overflow = "hidden";
    inApp.style.overflow = menu.style.overflow = appView.style.overflow = "hidden";
    inApp.style.visibility = appStore.style.visibility = appView.style.visibility = projects.style.visibility = contacts.style.visibility = "hidden";
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
        description: "Hello, I'm Anthony Huang. I grew up in Ontario and have a passion for technology and art. Welcome to my personal website where I share my journey."
    },
    "2": {
        title: "Programming",
        subtitle: "HTML/CSS, JS/TS, Python",
        description: "When I was 8 years old, I stumbled upon the computer programming course on Khan Academy, where I was introduced to p5.js. I then moved on to making many projects on Scratch. I learned HTML/CSS when I was 10.\n\nI made my return to programming when I was 13, after my computer history/hardware/YouTuber phase. I learned basic C to get back into it, and then I finally formally learned JavaScript, where I made my first side project, a Discord Bot. Then I started making websites again, where it is still my primary specialty to this day. In later years, I picked up Python and TypeScript."
    },
    "3": {
        title: "School",
        subtitle: "Grade 12, IBDP",
        description: "I am currently a high school student in Grade 12, enrolled in the International Baccalaureate Diploma Programme. I am taking HL English A (Language & Literature), HL French B, HL Geography, SL Chemistry, SL Physics, SL Mathematics AA.\n\nI am the Co-President of the Practical Section of our school's Computer Science Club, one of the biggest clubs at the school.\n\nI am an incoming Computer Science student at Carleton University, where I also hope to do a Linguistics minor. I am currently applying to Shopify Dev Degree."
    },
    "4": {
        title: "Contests",
        subtitle: "2x Hackathon Winner",
        description: "I've participated in 5 hackathons, winning awards in 2; Hack the Ridge 2023 (Solo Male Winner) and Hack the Ridge 2024 (Best .xyz Use). In all five hackathons, I made websites using HTML/CSS/JS/TS.\n\nI have also participated in the Canadian Computing Competition, Junior Division, where I scored 56/75 (I TLE'd on J4 💀). I use Python for competitive programming."
    },
    "5": {
        title: "Languages",
        subtitle: "English, French, Mandarin, Japanese",
        description: "I speak fluent English, B1 French, A2 Mandarin and A1 Japanese.\n\nI was born and lived in Québec for 8 years, where I spoke English and French on a daily basis (I lived in an Anglophone community in Montréal and indulged in mainly English media as a child). I spoke French at school with friends and used it outside the house. At home, I speak Chinese (Mandarin) and English with my family, as my parents are immigrants from China.\n\nWhen I was 8, I moved to Ontario, where I used English on the daily. While I still took French Immersion classes at school, my French skills quickly started to deteriorate over time as I had no opportunity to use them in daily life. My interest in the language has returned in Grade 12, where I am planning to do the DELF B2.\n\nWhen I was 15, I started watching anime again, and as I was travelling to Japan that summer, I decided to learn a bit of Japanese. Currently, I have my JLPT N5 certificate. I am pretty bad at speaking—as I have nobody to talk in Japanese with. The language has been really easy to learn thanks to my knowledge of Chinese. I am planning to take the JLPT N3 on December 2025. I keep up with my Japanese by studying with flashcards daily, watching Japanese Instagram Reels on my feed, as well as listening and singing Japanese music."
    },
    "6": {
        title: "Games",
        subtitle: "Minecraft, Roblox, Rocket League",
        description: "I play a variety of games. I have been playing Minecraft and Roblox for a while, since elementary school.\n\nThe game I currently play most is probably Rocket League, where my peak is Diamond II in 2v2.\n\nThe game I have the most playtime on is Geometry Dash, with over 1000 hours on Steam, and 63 demons completed. My hardest is Future Funk (Hard Demon) and I had a 72% best on Acu (Extreme Demon)."
    },
    "7": {
        title: "Football",
        subtitle: "Fan Zone",
        description: "I am a passionate supporter of CF Montréal in the MLS, closely following their matches and cheering for my team."
    },
    "8": {
        title: "Anime",
        subtitle: "Favorites",
        description: "I love watching anime, with favorite series like Steins;Gate, JJBA, and Horimiya inspiring my creative pursuits."
    },
    "9": {
        title: "Favorites",
        subtitle: "Personal Picks",
        description: "My favorite color is #FF7700 and my lucky number is 4, details that reflect my unique style and personality."
    },
    "10": {
        title: "Food",
        subtitle: "Cuisine",
        description: "I appreciate a wide range of foods, from juicy burgers to exquisite Japanese dishes that never fail to excite my taste buds."
    },
    "11": {
        title: "My Setup",
        subtitle: "My Devices",
        description: "I proudly use an M2 MacBook Air paired with a Keychron K8 featuring Milky Yellows, showcasing my blend of style and functionality."
    },
    "12": {
        title: "FHDHGNGN",
        subtitle: "Username Meaning",
        description: "My unique username, FHDHGNGN, holds a special meaning that reflects my personal brand and identity. Discover its story here."
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
        }
        // Replace the placeholder image with the app icon
        const iconSrc = appCard.querySelector("img").src;
        document.querySelector(".appView header img").src = iconSrc;
        appView.style.visibility = "visible";
        appView.style.opacity = "1";
        appView.style.overflow = "auto";
    });
});