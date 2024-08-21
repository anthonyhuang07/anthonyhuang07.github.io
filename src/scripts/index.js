const inapp = document.querySelector("#inApp")
const appStore = document.querySelector(".appStore")

const rankWidth = document.querySelector(".rank").offsetWidth;
document.documentElement.style.setProperty('--rank-width', `${rankWidth}px`);

function appOpen(app){
    inapp.style.visibility = "visible";
    inapp.style.opacity = "1";
    switch(app){
        case 1:
            appStore.style.visibility = "visible";
            appStore.style.opacity = "1";
            break;
    }
}

function returnHome(){
    inapp.style.visibility = "hidden";
    appStore.style.visibility = "hidden";
    inapp.style.opacity = "0";
    appStore.style.opacity = "0";
}