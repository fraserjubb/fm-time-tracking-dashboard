const statTitleList = Array.from(document.querySelectorAll('.dashboard__stats-activity'));
const statCurrentList = Array.from(document.querySelectorAll('.dashboard__stats-current'));
const statPreviousList = Array.from(document.querySelectorAll('.dashboard__stats-previous'));

const dailyBtn = document.querySelector('#daily');
const weeklyBtn = document.querySelector('#weekly');
const monthlyBtn = document.querySelector('#monthly');

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

loadDashboardData().then(() => updateDashboard('weekly'));

function updateDashboard(timeframe) {
  // Style Text
  dailyBtn.classList.toggle('white-text', timeframe === 'daily');
  weeklyBtn.classList.toggle('white-text', timeframe === 'weekly');
  monthlyBtn.classList.toggle('white-text', timeframe === 'monthly');

  // Update stats shown
  dashboardData.forEach((item, i) => {
    statTitleList[i].textContent = item.title;

    statCurrentList[i].textContent = `${item.timeframes[timeframe].current}hrs`;

    const previousLabels = {
      daily: 'Yesterday',
      weekly: 'Last Week',
      monthly: 'Last Month',
    };

    statPreviousList[i].textContent = `${previousLabels[timeframe]} - ${item.timeframes.daily.previous}hrs`;
  });
}

dailyBtn.addEventListener('click', () => updateDashboard('daily'));
weeklyBtn.addEventListener('click', () => updateDashboard('weekly'));
monthlyBtn.addEventListener('click', () => updateDashboard('monthly'));
