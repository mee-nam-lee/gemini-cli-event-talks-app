const scheduleElement = document.getElementById('schedule');
const searchInput = document.getElementById('search');
const speakerSearchInput = document.getElementById('speaker-search');
const clearSearchButton = document.getElementById('clear-search');

let talks = [];

const renderSchedule = (filteredTalks) => {
  scheduleElement.innerHTML = '';
  let currentTime = new Date('2025-01-01T10:00:00');

  filteredTalks.forEach((talk, index) => {
    const startTime = new Date(currentTime);
    const endTime = new Date(currentTime.getTime() + talk.duration * 60000);

    const talkElement = document.createElement('div');
    talkElement.classList.add('talk');
    talkElement.innerHTML = `
      <h2>${talk.title}</h2>
      <div class="speakers">By: ${talk.speakers.join(', ')}</div>
      <div class="category">Category: ${talk.category.map(c => `<span>${c}</span>`).join('')}</div>
      <div class="time">${startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
      <p>${talk.description}</p>
    `;
    scheduleElement.appendChild(talkElement);

    currentTime = new Date(endTime.getTime() + 10 * 60000);

    if (index === 2) {
      const lunchBreak = document.createElement('div');
      lunchBreak.classList.add('break');
      lunchBreak.innerHTML = `<h2>Lunch Break</h2>`;
      scheduleElement.appendChild(lunchBreak);
      currentTime = new Date(currentTime.getTime() + 60 * 60000);
    }
  });
};

const filterTalks = () => {
  const categorySearchTerm = searchInput.value.toLowerCase();
  const speakerSearchTerm = speakerSearchInput.value.toLowerCase();
  const filteredTalks = talks.filter(talk => {
    const categoryMatch = talk.category.some(category => category.toLowerCase().includes(categorySearchTerm));
    const speakerMatch = talk.speakers.some(speaker => speaker.toLowerCase().includes(speakerSearchTerm));
    return categoryMatch || speakerMatch;
  });
  renderSchedule(filteredTalks);
};

const clearSearch = () => {
  searchInput.value = '';
  speakerSearchInput.value = '';
  renderSchedule(talks);
};

searchInput.addEventListener('input', filterTalks);
speakerSearchInput.addEventListener('input', filterTalks);
clearSearchButton.addEventListener('click', clearSearch);

fetch('/api/talks')
  .then(response => response.json())
  .then(data => {
    talks = data;
    renderSchedule(talks);
  });