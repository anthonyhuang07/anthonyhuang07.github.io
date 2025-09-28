const contactGroups = [
    {
        items: [
            { platform: 'email', username: 'info@anthonyhuang.net', link: 'mailto:info@anthonyhuang.net', icon: 'fa-solid fa-envelope' },
        ]
    },
    {
        items: [
            { platform: 'Discord', username: '@fhdhgngn', link: 'https://discord.com/users/628672513345454122', icon: 'fa-brands fa-discord' },
            { platform: 'Instagram', username: 'anthonyhuang07', link: 'https://www.instagram.com/anthonyhuang07/', icon: 'fa-brands fa-instagram' },
        ]
    },
    {
        items: [
            { platform: 'GitHub', username: 'anthonyhuang07', link: 'https://github.com/anthonyhuang07', icon: 'fa-brands fa-github' },
            { platform: 'LinkedIn', username: 'anthonyhuang07', link: 'https://www.linkedin.com/in/anthonyhuang07/', icon: 'fa-brands fa-linkedin' },
        ]
    },
    {
        items: [
            { platform: 'MyAnimeList', username: 'FHDHGNGN', link: 'https://myanimelist.net/profile/FHDHGNGN', icon: 'fa-solid fa-film' },
            { platform: 'Apple Music', username: 'anthonyhuang07', link: 'https://music.apple.com/profile/anthonyhuang07', icon: 'fa-solid fa-music' }
        ]
    },
];

function renderContacts() {
    const container = document.getElementById('contactInfo');
    if (!container) return;

    const groupsHtml = contactGroups.map(group => {
        const itemsHtml = group.items.map(item => `
      <a class="infoBox" href="${item.link}" target="_blank" rel="noopener noreferrer">
        <h2><i class="${item.icon}"></i> ${item.platform}</h2>
        <p>${item.username}</p>
      </a>
    `).join('');
        return `<div class="infoCluster">${itemsHtml}</div>`;
    }).join('');

    container.innerHTML = groupsHtml;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderContacts);
} else {
    renderContacts();
}
