let current = new Date();
document.getElementById("title").innerHTML = `Hello! Today is <span class="date">${current.toLocaleDateString()}.</span>`;