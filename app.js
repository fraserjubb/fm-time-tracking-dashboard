/*
*********
SELECT ELEMENTS
*********
*/
const statCard = Array.from(document.querySelectorAll('.dashboard__stats'));
const statTitleList = Array.from(document.querySelectorAll('.dashboard__stats-activity'));
const statCurrentList = Array.from(document.querySelectorAll('.dashboard__stats-current'));
const statPreviousList = Array.from(document.querySelectorAll('.dashboard__stats-previous'));

const dailyBtn = document.querySelector('#daily');
const weeklyBtn = document.querySelector('#weekly');
const monthlyBtn = document.querySelector('#monthly');

/*
*********
FETCH JSON FILE DATA
*********
*/
let dashboardData = null;
function loadDashboardData() {
  return fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      dashboardData = data;
      return data;
    })
    .catch(error => {
      console.error('Failed to load dashboard data:', error);
      return null;
    });
}

/*
*********
FUNCTIONS
*********
*/
function updateDashboard(timeframe) {
  const previousLabels = {
    daily: 'Yesterday',
    weekly: 'Last Week',
    monthly: 'Last Month',
  };

  // Style Text
  dailyBtn.classList.toggle('white-text', timeframe === 'daily');
  weeklyBtn.classList.toggle('white-text', timeframe === 'weekly');
  monthlyBtn.classList.toggle('white-text', timeframe === 'monthly');

  // Update stats shown
  dashboardData.forEach((item, i) => {
    statTitleList[i].textContent = item.title;

    statCurrentList[i].textContent = `${item.timeframes[timeframe].current}hrs`;

    statPreviousList[i].textContent = `${previousLabels[timeframe]} - ${item.timeframes[timeframe].previous}hrs`;
  });
}

function selectCard(e) {
  const clickedCard = e.currentTarget;
  const isSelected = clickedCard.classList.contains('dashboard__stats--selected');

  statCard.forEach(card => {
    card.classList.remove('dashboard__stats--selected');
    clickedCard.classList.toggle('dashboard__stats--selected', !isSelected);
  });
}

/*
*********
EVENT LISTENERS
*********
*/
// Select a timeframe:
[dailyBtn, weeklyBtn, monthlyBtn].forEach(btn => btn.addEventListener('click', () => updateDashboard(btn.id)));

// Select a card:
statCard.forEach(card => {
  card.addEventListener('click', selectCard);
});

/*
*********
INITIAL PAGE LOAD
*********
*/

loadDashboardData().then(() => {
  updateDashboard('weekly');
});
