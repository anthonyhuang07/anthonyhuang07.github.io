let current = new Date();
document.getElementById("title").innerHTML = `Hello! Today is ${current.toLocaleDateString()}.`;
document.querySelector('#blob').addEventListener('click', function() {
    alert('The blob is minding his own business. Leave him alone.');
});