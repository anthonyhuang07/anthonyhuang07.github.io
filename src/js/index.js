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