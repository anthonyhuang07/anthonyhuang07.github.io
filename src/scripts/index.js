const inapp = document.querySelector("#inApp")
const appStore = document.querySelector(".appStore")

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