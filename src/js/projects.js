// Featured projects
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
    description: "An Adventure Capitalist-inspired game made for my Grade 11 High School CS course.",
    link: "https://anthonyhuang.net/ICS3U1-FPT/",
    icon: "/assets/icons/bytebucks.png"
  },
  "Piracy": {
    description: "Piracy is a serious crime. Click for more info... (Prank Website)",
    link: "https://anthonyhuang.net/piracy/",
    icon: "https://static.vecteezy.com/system/resources/thumbnails/012/042/301/small_2x/warning-sign-icon-transparent-background-free-png.png"
  },
};

// Archived projects
const archivedProjects = {
  "blog.anthonyhuang.net": {
    description: "My personal blog. No longer maintained.",
    link: "https://blog.anthonyhuang.net/",
    icon: "https://github.com/anthonyhuang07/blog.anthonyhuang.net/blob/main/assets/img/newProfilePicture.png?raw=true"
  },
  "FHDBot": {
    description: "A random bot with random features. My first project, made in 2022.",
    link: "https://github.com/anthonyhuang07/FHDBot",
    icon: "/assets/icons/oldpfp.png"
  },
  "Discord Formatter": {
    description: "A website to help you format your Discord messages!",
    link: "https://anthonyhuang.net/discord-formatter/",
    icon: "https://play-lh.googleusercontent.com/0oO5sAneb9lJP6l8c6DH4aj6f85qNpplQVHmPmbbBxAukDnlO7DarDW0b-kEIHa8SQ=w240-h480-rw"
  },
  "Rhythm Revolver": {
    description: "Web rhythm game made for my Grade 10 High School CS course.",
    link: "https://anthonyhuang.net/ICS2O1-FPT/",
    icon: "https://media.licdn.com/dms/image/v2/C5112AQExUeu0Uwrxdg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1555853756108?e=2147483647&v=beta&t=N96fwDtStzXrEpQh9sTr9VUOmtLYGL3jNvK0QvobxuU"
  },
  "SelfStats": {
    description: "A hub for simple, everyday health tools. Solo Hackathon-Winning project.",
    link: "https://anthonyhuang.net/SelfStats/",
    icon: "/assets/icons/selfstats.png"
  },
  "TextToTest": {
    description: "A quiz website that uses Markdown to create quizzes. Solo Hackathon-Winning project.",
    link: "https://anthonyhuang.net/TextToTest/",
    icon: "https://github.com/anthonyhuang07/TextToTest/blob/main/assets/logo.png?raw=true"
  },
  "Latin Variants Translator": {
    description: "A translator for Pig Latin, Egg Latin, and Bacon Omelette Latin.",
    link: "https://anthonyhuang.net/Latin-Variants-Translator/",
    icon: "https://static.wikia.nocookie.net/logopedia/images/5/52/Translate.png"
  },
  "FocusFrame": {
    description: "A minimalistic and customizable study dashboard. Made for a Hackathon.",
    link: "https://anthonyhuang.net/FocusFrame/",
    icon: "https://github.com/anthonyhuang07/FocusFrame/blob/main/assets/image.png?raw=true"
  },
};

// Non-Tech projects (same shape as above)
const nonTechProjects = {
  "Metropolitan French VS Québec French": {
    description: "My IB Extended Essay (~4000 word academic paper) comparing Parisian and Québec French linguistically.",
    link: "https://docs.google.com/document/d/1_EMppz874MndkfzhzCydNiehpn5TGKabTHW_8_mD1lI/edit?usp=sharing",
    icon: "/assets/icons/quebec.webp"
  },
  '"Why Are You Gay?" Interview Transcript': {
    description: '(WIP) Transcript of the full "Why Are You Gay?" meme interview, including attempted Luganda transcriptions.',
    link: "https://docs.google.com/document/d/1YS78bgezRsP86fOXIdbk1NIXc3aLJF3CZcPdBh2vup0/",
    icon: "https://i1.sndcdn.com/artworks-yHfbqspd8QRZY5ZM-r0ANfQ-t500x500.jpg"
  },
  "Huang Romanization (Standard Iranian Persian)": {
    description: "A romanization system that standardizes the typed form of Standard Iranian Persian/Western Persian.",
    link: "https://docs.google.com/document/d/1C7u5z-WBAmdkg94pC71cciqXgKX6X-BVK-x6ym0JmvY/edit?tab=t.0",
    icon: "/assets/icons/iran.webp"
  },
};

let currentProjectsMap = projectDetails;
let currentProjectsView = 'featured'; // 'featured' | 'archived' | 'nontech'

function renderProjects(map) {
  const projectsContainer = document.querySelector('.menu.projects main');
  if (!projectsContainer) return;

  const keys = Object.keys(map);
  if (keys.length === 0) {
    projectsContainer.innerHTML = `
      <div class="project empty">
        <div>
          <p class="project-name">Nothing here yet</p>
          <p class="project-desc">No projects in this section for now.</p>
        </div>
      </div>
    `;
  } else {
    projectsContainer.innerHTML = keys
      .map((title) => {
        const details = map[title];
        return `
            <div class="project">
              <img src="${details.icon}" alt="${title}">
              <div>
                <p class="project-name">${title}</p>
                <p class="project-desc">${details.description}</p>
              </div>
            </div>`;
      })
      .join('');
  }

  currentProjectsMap = map;
}

function setProjectsHeader(title) {
  const header = document.querySelector('.menu.projects header h1');
  if (header) header.textContent = title;
}

function setProjectsFooterActive(view) {
  const featuredBtn = document.getElementById('projects-footer-featuredprojects');
  const archivedBtn = document.getElementById('projects-footer-archivedprojects');
  const nontechBtn = document.getElementById('projects-footer-nontechprojects');
  if (featuredBtn) featuredBtn.classList.toggle('active', view === 'featured');
  if (archivedBtn) archivedBtn.classList.toggle('active', view === 'archived');
  if (nontechBtn) nontechBtn.classList.toggle('active', view === 'nontech');
}

function showFeaturedProjects() {
  renderProjects(projectDetails);
  setProjectsHeader('Featured Projects');
  setProjectsFooterActive('featured');
  currentProjectsView = 'featured';
}

function showArchivedProjects() {
  renderProjects(archivedProjects);
  setProjectsHeader('Archived Projects');
  setProjectsFooterActive('archived');
  currentProjectsView = 'archived';
}

function showNonTechProjects() {
  renderProjects(nonTechProjects);
  setProjectsHeader('Non-Tech Projects');
  setProjectsFooterActive('nontech');
  currentProjectsView = 'nontech';
}

function createProject() {
  // default view
  showFeaturedProjects();
}

function attachProjectListeners() {
  const projectsContainer = document.querySelector('.menu.projects main');
  if (projectsContainer) {
    projectsContainer.addEventListener('click', (event) => {
      const card = event.target.closest('.project');
      if (!card) return;
      const name = card.querySelector('.project-name')?.textContent.trim();
      if (name) {
        const details = currentProjectsMap[name];
        if (details && details.link) {
          window.open(details.link, '_blank');
        }
      }
    });
  }

  // Footer toggle buttons
  const featuredBtn = document.getElementById('projects-footer-featuredprojects');
  const archivedBtn = document.getElementById('projects-footer-archivedprojects');
  const nontechBtn = document.getElementById('projects-footer-nontechprojects');
  if (featuredBtn) {
    featuredBtn.addEventListener('click', () => {
      if (currentProjectsView !== 'featured') showFeaturedProjects();
    });
  }
  if (archivedBtn) {
    archivedBtn.addEventListener('click', () => {
      if (currentProjectsView !== 'archived') showArchivedProjects();
    });
  }
  if (nontechBtn) {
    nontechBtn.addEventListener('click', () => {
      if (currentProjectsView !== 'nontech') showNonTechProjects();
    });
  }
}