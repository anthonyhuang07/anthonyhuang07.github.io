const CONTACTS_DATA_URL = '/src/data/contacts.json';
let contactGroups = [];
let contactGroupsPromise = null;

function loadContactGroups() {
  if (contactGroups.length) {
    return Promise.resolve(contactGroups);
  }
  if (!contactGroupsPromise) {
    contactGroupsPromise = fetch(CONTACTS_DATA_URL)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load contacts data');
        return response.json();
      })
      .then((data) => {
        contactGroups = Array.isArray(data) ? data : [];
        return contactGroups;
      })
      .catch((error) => {
        console.error('Error fetching contacts data:', error);
        contactGroupsPromise = null;
        return [];
      });
  }
  return contactGroupsPromise;
}

function renderContacts(groups = []) {
  const container = document.getElementById('contactInfo');
  if (!container) return;

  const groupsHtml = groups
    .map((group) => {
      const itemsHtml = (group.items || [])
        .map(
          (item) => `
        <a class="infoBox" href="${item.link}" target="_blank" rel="noopener noreferrer">
          <h2><i class="${item.icon}"></i> ${item.platform}</h2>
          <p>${item.username}</p>
        </a>
      `
        )
        .join('');
      return `<div class="infoCluster">${itemsHtml}</div>`;
    })
    .join('');

  container.innerHTML = groupsHtml;
}

function initContacts() {
  loadContactGroups()
    .then((groups) => renderContacts(groups))
    .catch(() => renderContacts([]));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContacts);
} else {
  initContacts();
}
