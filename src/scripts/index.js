const inApp = document.querySelector("#inApp")
const menu = document.querySelector(".menu")
const appStore = document.querySelector(".appStore")
const contacts = document.querySelector(".contacts")

window.onkeydown = (e) => {
    if(e.keyCode == 27){
        returnHome()
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
            break;
        case 3:
            contacts.style.visibility = "visible";
            contacts.style.overflow = "auto";
            contacts.style.opacity = "1";
    }
}

function returnHome(){
    document.body.style.overflow = "hidden";
    inApp.style.overflow = menu.style.overflow = "hidden"
    inApp.style.visibility = appStore.style.visibility = contacts.style.visibility = "hidden";
    inApp.style.opacity = menu.style.opacity = "0";
}