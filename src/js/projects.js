const projectDetails = {
  "Ontario IB Mark Converter": {
    description: "Converts your Raw IB Mark to a Converted OSSD Mark. (Used by ~300 IBDP students, 8000+ Google clicks)",
    link: "http://ibconverter.com/",
    icon: "https://www.ibschoolsofontario.ca/wp-content/uploads/2018/12/IB-world-shools-1.png"
  },
  "PomodoPro": {
    description: "A minimalistic and customizable Pomodoro experience. Began as a solo Hackathon project.",
    link: "https://pomodopro.app/",
    icon: "https://github.com/anthonyhuang07/PomodoPro/blob/main/assets/pomodoProLogo.png?raw=true"
  },
  "ByteBucks": {
    description: "An Adventure Capitalist-inspired game made for my Grade 11 High School CS course (100% Final).",
    link: "https://anthonyhuang.net/ICS3U1-FPT/",
    icon: "/assets/icons/bytebucks.png"
  },
  "SelfStats": {
    description: "A hub for simple, everyday health tools. Solo Hackathon-Winning project which took under 12 hours to build.",
    link: "https://anthonyhuang.net/SelfStats/",
    icon: "/assets/icons/selfstats.png"
  },
  "Piracy": {
    description: "Piracy is a serious crime. Click for more info... (Prank Website)",
    link: "https://anthonyhuang.net/piracy/",
    icon: "https://static.vecteezy.com/system/resources/thumbnails/012/042/301/small_2x/warning-sign-icon-transparent-background-free-png.png"
  },
  "Metropolitan French VS Québec French": {
    description: "My IB Extended Essay (~4000 word academic paper) comparing Parisian and Québec French linguistically.",
    link: "https://docs.google.com/document/d/1_EMppz874MndkfzhzCydNiehpn5TGKabTHW_8_mD1lI/edit?usp=sharing",
    icon: "/assets/icons/quebec.webp"
  },
  "Huang Romanization (Standard Iranian Persian)": {
    description: "A romanization system that standardizes the typed form of Standard Iranian Persian/Western Persian.",
    link: "https://docs.google.com/document/d/1C7u5z-WBAmdkg94pC71cciqXgKX6X-BVK-x6ym0JmvY/edit?tab=t.0",
    icon: "/assets/icons/iran.webp"
  },
};

function createProject() {
  const projectsContainer = document.querySelector(".menu.projects main");
  projectsContainer.innerHTML = Object.keys(projectDetails)
    .map(title => {
      const details = projectDetails[title];
      return `
          <div class="project">
            <img src="${details.icon}" alt="${title}">
            <div>
              <p class="project-name">${title}</p>
              <p class="project-desc">${details.description}</p>
            </div>
          </div>`;
    }).join("");
}

function attachProjectListeners() {
  const projectsContainer = document.querySelector(".menu.projects main");
  projectsContainer.addEventListener("click", event => {
    const card = event.target.closest(".project");
    if (!card) return;
    const name = card.querySelector(".project-name")?.textContent.trim();
    if (name) {
      const details = projectDetails[name];
      if (details && details.link) {
        window.open(details.link, "_blank");
      }
    }
  });
}