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

// Updated mapping for app details: rank => { title, subtitle, description }
const appDetails = {
    "1": {
        title: "YouTube: Watch, Listen, Stream",
        subtitle: "Videos, Music and Live Streams",
        description: "Hello, I'm Anthony Huang. I grew up in Ontario and have a passion for technology and art. Welcome to my personal website where I share my journey."
    },
    "2": {
        title: "Programming",
        subtitle: "HTML/CSS, JavaScript, TypeScript, Python.",
        description: "I excel at HTML, CSS, JavaScript, TypeScript, and Python, and love building innovative web experiences that make an impact."
    },
    "3": {
        title: "School",
        subtitle: "Education",
        description: "I am currently a Grade 12 student in the International Baccalaureate Diploma Program, actively engaging in extracurriculars and leadership roles."
    },
    "4": {
        title: "Contests",
        subtitle: "Achievements",
        description: "I've participated in and won multiple hackathons, including 2-time hackathon victories and high scores in competitive programming."
    },
    "5": {
        title: "Languages",
        subtitle: "Linguistic Skills",
        description: "I speak English, French, Mandarin, and Japanese fluently, which helps me connect with diverse cultures and communities."
    },
    "6": {
        title: "Games",
        subtitle: "Gaming Interests",
        description: "From Rocket League to Minecraft, I enjoy games that challenge my creative and analytical skills in a fun way."
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