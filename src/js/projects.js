const projectDetails = {
  "Ontario IB Mark Converter": {
      description: "Converts your Raw IB Mark to a Converted OSSD Mark.",
      link: "https://ibconverter.live/",
      icon: "https://www.ibschoolsofontario.ca/wp-content/uploads/2018/12/IB-world-shools-1.png"
  },
  "PomodoPro": {
      description: "A minimalistic and customizable Pomodoro experience.",
      link: "https://pomodopro.app/",
      icon: "https://github.com/anthonyhuang07/PomodoPro/blob/main/assets/pomodoProLogo.png?raw=true"
  },
  "Piracy": {
      description: "Piracy is a serious crime. Click for more info...",
      link: "https://anthonyhuang.net/piracy/",
      icon: "https://openclipart.org/image/2000px/29833"
  },
  "ByteBucks": {
    description: "A basic Adventure Capitalist-inspired game made for my high school CS course.",
    link: "https://anthonyhuang.net/ICS3U1-FPT/",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Dollar_sign_in_circle_cleaned_%28PD_version%29.green.svg/1024px-Dollar_sign_in_circle_cleaned_%28PD_version%29.green.svg.png"
},
  "Huang Romanization (Standard Iranian Persian)": {
      description: "A romanization system that standardizes the typed form of Standard Iranian Persian/Western Persian.",
      link: "https://docs.google.com/document/d/1C7u5z-WBAmdkg94pC71cciqXgKX6X-BVK-x6ym0JmvY/edit?tab=t.0",
      icon: "/assets/icons/iran.webp"
  }
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

document.addEventListener("DOMContentLoaded", () => {
  createProject();
  attachProjectListeners();
});