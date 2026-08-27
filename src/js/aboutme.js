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
                return appDetails;
            })
            .catch((error) => {
                console.error('Error loading about me data:', error);
                appDetailsPromise = null;
                return [];
            });
    }
    return appDetailsPromise;
}

async function createApp() {
    const appsContainer = document.getElementById("apps");
    if (!appsContainer) return;

    const apps = await fetchAppDetails();

    const cards = apps.map((details) => {
        const images = Array.isArray(details.images) ? details.images.slice(0, 3) : [];
        const card = document.createElement("div");
        card.className = "app";
        card.innerHTML = `
                <div class="aboutme-app-main">
                    <div class="aboutme-app-info">
                        <img src="${details.icon}" alt="${details.title}">
                        <div class="aboutme-app-info-child">
                            <p class="name">${details.title}</p>
                            <p class="desc">${details.subtitle}</p>
                        </div>
                    </div>
                    <div class="aboutme-app-viewButton">
                        <p class="appStore-viewButton">View</p>
                    </div>
                </div>
                ${images.length ? `
                    <div class="aboutme-app-images images-${images.length}">
                        ${images.map((image) => `<img src="${image}" alt="${details.title} preview">`).join("")}
                    </div>
                ` : ""}`;
        card.addEventListener("click", () => openAppView(details));
        return card;
    });

    appsContainer.replaceChildren(...cards);
}

function openAppView(details) {
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
        appView.closest(".aboutme")?.classList.add("app-view-open");
        appView.scrollTop = 0;
        appView.style.visibility = "visible";
        appView.style.opacity = "1";
        appView.style.overflow = "auto";
    }
}

function hideAppView() {
    const appView = document.querySelector(".appView");
    if (appView) {
        appView.closest(".aboutme")?.classList.remove("app-view-open");
        appView.style.visibility = "hidden";
        appView.style.opacity = "0";

    }
}
