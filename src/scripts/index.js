const inapp = document.querySelector("#inApp")
const appStore = document.querySelector(".appStore")

function appOpen(app){
    inapp.style.display = "block";
    switch(app){
        case 1:
            appStore.style.display = "block";
            break;
    }
}