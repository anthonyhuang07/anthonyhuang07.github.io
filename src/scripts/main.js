const date1 = document.getElementById("date1")
const date2 = document.getElementById("date2")
const header = document.getElementById("h-hide")
let yPos = window.scrollY
function split(){
    date1.style.transform = "rotate(-"+(window.scrollY/20)+"deg) translate(-"+(window.scrollY/2)+"px)";
    date2.style.transform = "rotate("+(window.scrollY/20)+"deg) translate("+(window.scrollY/2)+"px)";
    date1.style.opacity = ("1")-(window.scrollY/1000);
    date2.style.opacity = ("1")-(window.scrollY/1000);  
    console.log((1)-(window.scrollY/1000))
}
function headerHide(){
    if (yPos < window.scrollY){
        header.style.top = "-8vh";
    } else if (yPos > window.scrollY){
        header.style.top = "0";
    }
    yPos = window.scrollY
}


let current = new Date();
document.getElementById("title").innerHTML = `Hello! Today is <span class="date">${current.toLocaleDateString()}.</span>`;