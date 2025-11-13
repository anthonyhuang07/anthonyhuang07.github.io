const ABOUT_DATA_URL = '/src/data/aboutme.json';
let appDetails = null;
let appDetailsPromise = null;

function fetchAppDetails() {
    if (appDetails) {
        return Promise.resolve(appDetails);
    }
    if (!appDetailsPromise) {
        appDetailsPromise = fetch(ABOUT_DATA_URL)
            .then((response) => {
                if (!response.ok) throw new Error('Failed to load about data');
                return response.json();
            })
            .then((data) => {
                appDetails = data;
                return data;
            })
            .catch((error) => {
                console.error('Error loading about me data:', error);
                appDetailsPromise = null;
                return {};
            });
    }
    return appDetailsPromise;
}

async function createApp() {
    const appsContainer = document.getElementById("apps");
    if (!appsContainer) return;

    const apps = Object.entries(await fetchAppDetails());

    appsContainer.innerHTML = apps
        .map(([rank, details]) => {
            if (!details) return '';
            return `
            <div class="app">
              <div>
                <img src="${details.icon}" alt="${details.title}">
                <div>
                  <div>
                    <p class="rank">${rank}</p>
                    <p class="name">${details.title}</p>
                  </div>
                  <div>
                    <p class="descMargin">${rank}</p>
                    <p class="desc">${details.subtitle}</p>
                  </div>
                </div>
              </div>
              <div>
                <p class="appStore-viewButton">View</p>
              </div>
            </div>`;
        })
        .join("");
}

function openAppView(rank) {
    const details = appDetails?.[rank];
    if (!details) return;
    document.querySelector(".appView header h1").innerText = details.title;
    document.querySelector(".appView header h2").innerText = details.subtitle;
    document.querySelector(".appStore-appView-about p").innerHTML = details.description;
    const openButton = document.querySelector(".appStore-openButton");
    if (!details.link.trim() || details.link === "#") {
        openButton.classList.add("disabled");
        openButton.onclick = null;
    } else {
        openButton.classList.remove("disabled");
        openButton.onclick = () => window.open(details.link, "_blank");
    }
    document.querySelector(".appView header img").src = details.icon;
    const appView = document.querySelector(".appView");
    if (appView) {
        appView.style.visibility = "visible";
        appView.style.opacity = "1";
        appView.style.overflow = "auto";
    }
    if (window.innerWidth <= 480) {
        document.querySelector('#apps').style.display = 'none';
    }
}

function hideAppView() {
    const appView = document.querySelector(".appView");
    if (appView) {
        appView.style.visibility = "hidden";
        appView.style.opacity = "0";

    }
    if (window.innerWidth <= 480) {
        document.querySelector('#apps').style.display = 'flex';
    }
}

function attachAppListeners() {
    const appsElement = document.getElementById("apps");
    if (!appsElement) return;
    appsElement.addEventListener("click", (event) => {
        const card = event.target.closest(".app");
        if (!card) return;
        const rank = card.querySelector(".rank")?.textContent.trim();
        if (rank) openAppView(rank);
    });
}
