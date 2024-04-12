const date = document.getElementById("date")
const lang = document.getElementById("randLang")

// set date in footer
d = new Date()
date.innerHTML = "Copyright (c) " + d.getFullYear() + " Anthony Huang"

const langs = ["Hello", "Bonjour", "你好"]

lang.innerHTML = langs[Math.floor(Math.random() * langs.length)]