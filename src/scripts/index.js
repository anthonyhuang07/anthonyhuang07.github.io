const inApp = document.querySelector("#inApp")
const menu = document.querySelector(".menu")
const appStore = document.querySelector(".appStore")
const projects = document.querySelector(".projects")
const contacts = document.querySelector(".contacts")
const appButton = document.querySelector(".appButton")
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

appButton.addEventListener("click", () => {
    appView.style.visibility = "visible"
    appView.style.opacity = "1"
    appView.style.overflow = "auto"
})