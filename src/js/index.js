const inApp = document.querySelector("#inApp")
const menu = document.querySelector(".menu")
const aboutme = document.querySelector(".aboutme")
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
  document.querySelectorAll('.menu').forEach(menu => {
    menu.style.visibility = 'hidden';
    menu.style.opacity = '0';
  });
  document.querySelector('#inApp').style.visibility = 'visible';
  document.querySelector('#inApp').style.opacity = '1';

  if (app === 1) {
    document.querySelector('.menu.aboutme').style.visibility = 'visible';
    document.querySelector('.menu.aboutme').style.opacity = '1';

    createApp();
    attachAppListeners();
  } else if (app === 2) {
    document.querySelector('.menu.projects').style.visibility = 'visible';
    document.querySelector('.menu.projects').style.opacity = '1';

    createProject();
    attachProjectListeners();
  } else if (app === 3) {
    document.querySelector('.menu.contacts').style.visibility = 'visible';
    document.querySelector('.menu.contacts').style.opacity = '1';
  } else if (app === 4) {
    document.querySelector('.menu.music').style.visibility = 'visible';
    document.querySelector('.menu.music').style.opacity = '1';
  }
}

function returnHome(){
    inApp.style.visibility = aboutme.style.visibility = appView.style.visibility = projects.style.visibility = contacts.style.visibility = music.style.visibility = "hidden";
    inApp.style.opacity = menu.style.opacity = appView.style.opacity = "0";
}

function hideAppView(){
    appView.style.visibility = "hidden"
    appView.style.opacity = "0"
    appView.style.overflow = "hidden"
}

function cycleName(){
  const nameEl = document.querySelector("#name");
  const names = ["Anthony Huang", "黄嘉言", "アンソニー", "황가언"];
  let index = 0;
  setInterval(() => {
    nameEl.style.opacity = "0";
    nameEl.addEventListener("transitionend", function handler() {
      if (window.getComputedStyle(nameEl).opacity === "0") {
        index = (index + 1) % names.length;
        nameEl.textContent = names[index];
        nameEl.style.opacity = "1";
      }
    }, { once: true });
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  const backgrounds = [
    "/assets/backgrounds/0.webp",
    "/assets/backgrounds/1.webp",
    "/assets/backgrounds/2.webp",
    // "assets/backgrounds/4.jpg",
  ];
  const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  const bgDiv = document.getElementById("bg");
  if (bgDiv) {
    bgDiv.style.backgroundImage = `url('${randomBg}')`;
  }
  cycleName();
});