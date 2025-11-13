const PROJECTS_DATA_URL = '/src/data/projects.json';
let projectData = null;
let projectDataPromise = null;

let currentProjectsMap = {};
let currentProjectsView = 'featured'; // 'featured' | 'archived' | 'nontech'

function loadProjectsData() {
  if (projectData) {
    return Promise.resolve(projectData);
  }
  if (!projectDataPromise) {
    projectDataPromise = fetch(PROJECTS_DATA_URL)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load projects data');
        return response.json();
      })
      .then((data) => {
        projectData = data;
        return data;
      })
      .catch((error) => {
        console.error('Error fetching projects data:', error);
        projectDataPromise = null;
        return {};
      });
  }
  return projectDataPromise;
}

function renderProjects(map = {}) {
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
        if (!details) return '';
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
  const featuredBtn = document.getElementById('projects-footer-featured');
  const archivedBtn = document.getElementById('projects-footer-archived');
  const nontechBtn = document.getElementById('projects-footer-nontech');
  if (featuredBtn) featuredBtn.classList.toggle('active', view === 'featured');
  if (archivedBtn) archivedBtn.classList.toggle('active', view === 'archived');
  if (nontechBtn) nontechBtn.classList.toggle('active', view === 'nontech');
}

async function showFeaturedProjects() {
  const data = await loadProjectsData();
  renderProjects(data.featured || {});
  setProjectsHeader('Featured Projects');
  setProjectsFooterActive('featured');
  currentProjectsView = 'featured';
}

async function showArchivedProjects() {
  const data = await loadProjectsData();
  renderProjects(data.archived || {});
  setProjectsHeader('Archived Projects');
  setProjectsFooterActive('archived');
  currentProjectsView = 'archived';
}

async function showNonTechProjects() {
  const data = await loadProjectsData();
  renderProjects(data.nontech || {});
  setProjectsHeader('Non-Tech Projects');
  setProjectsFooterActive('nontech');
  currentProjectsView = 'nontech';
}

function createProject() {
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

  const featuredBtn = document.getElementById('projects-footer-featured');
  const archivedBtn = document.getElementById('projects-footer-archived');
  const nontechBtn = document.getElementById('projects-footer-nontech');
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
